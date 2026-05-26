"""
Anonimiza dados do astro-bi-web in-place:
- Mapeia colunas textuais para "Categoria N", "Marca N", etc (determinístico por valor)
- Rehash de IDs (id_produto -> P00001)
- Divide colunas numéricas por 3
- Aplica jitter multiplicativo ±10% (seed fixa)
- Persiste mapping em raw-data/_anon_mapping.json para auditoria

Idempotente: rodar 2x produz o mesmo resultado (seed fixa + ordem determinística).
"""
import json
import os
import re
import sys
from pathlib import Path

import numpy as np
import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"
PUBLIC_DATA_DIR = ROOT / "public-data"
RAW_DIR = ROOT / "raw-data" / "engine_output"

RNG = np.random.default_rng(42)
JITTER = 0.10
DIVISOR = 3.0

# Por "namespace" — campos com o mesmo namespace compartilham o mapping (ex:
# id_produto em dim_produto deve ser o mesmo id_produto em vendas_mensal).
TEXT_NAMESPACES = {
    "categoria_mae": ("categoria", "Categoria"),
    "categoria": ("categoria", "Categoria"),
    "sub_categoria": ("subcategoria", "Subcategoria"),
    "marca": ("marca", "Marca"),
    "familia": ("familia", "Familia"),
    "seo_title": ("produto", "Produto"),
    "nome": ("produto", "Produto"),
    "kit_nome": ("produto", "Produto"),
    "simples_nome": ("produto", "Produto"),
    "nome_fornecedor": ("fornecedor", "Fornecedor"),
    "cliente_bairro": ("bairro", "Bairro"),
    "cliente_cidade": ("cidade", "Cidade"),
    "cliente_uf": ("uf", "UF"),
    "nome_transportador": ("transportadora", "Transportadora"),
    "classe_produto": ("classe", "Classe"),
    "localizacao": ("local", "Local"),
    "tipo": ("tipo", "Tipo"),
}

ID_NAMESPACES = {
    "id_produto": ("produto_id", "P"),
    "id_produto_pai": ("produto_id", "P"),
    "kit_id": ("produto_id", "P"),
    "simples_id": ("produto_id", "P"),
    "codigo": ("codigo", "COD"),
    "kit_codigo": ("codigo", "COD"),
    "simples_codigo": ("codigo", "COD"),
    "numero": ("pedido", "PED"),
}

NUMERIC_FIELDS = {
    # parquet vendas_dash
    "valor_rateado", "preco_custo", "quantidade",
    # dim_produto / encalhe
    "preco", "estoque_atual", "estoque_disponivel", "estoque_minimo",
    "valor_estoque_venda", "valor_estoque_custo",
    "cdi_mes", "receita_12m", "margem_12m", "dias_sem_venda",
    # agregados / benchmark / cenarios / plano_acao
    "valor_venda", "valor_custo", "skus_encalhe", "valor_encalhe",
    "skus", "valor", "giro", "dio",
    "valor_em_estoque", "potencial_recuperacao", "prazo_dias",
    "recuperacao_bruta_R$", "recuperacao_liquida_R$",
    "margem_sacrificada_R$", "cdi_economizado_R$", "liquido_caixa_R$",
    # serie_temporal mensal + cobertura
    "receita", "cmv", "margem", "qtd", "pedidos", "skus_vendidos",
    "dio_estimado",
    "vmd_30d", "vmd_60d", "vmd_90d", "vmd_180d",
    "cobertura_30d", "cobertura_60d", "cobertura_90d", "cobertura_180d",
    # kits
    "kit_saldo_pacotes", "kit_qtd_pacote", "kit_equiv_unidades",
    "kit_valor_estoque", "simples_saldo", "simples_valor_estoque",
    "simples_receita_12m",
    # kpis
    "total_skus", "skus_com_estoque", "skus_sem_estoque", "skus_kit",
    "cdi_mes_total", "cdi_mes_encalhado",
    # serie_temporal scalars
    "receita_90d", "receita_90d_anterior",
    "receita_30d", "receita_30d_anterior",
    # meta
    "linhas_vendas_12m", "linhas_vendas_total", "linhas_dim_produto",
    "linhas_vendas_mensal", "linhas_vendas_semanal",
    # benchmark quartis
    "p25", "p50_mediana", "p75", "media", "empresa_global",
}

# Numéricos que NÃO devem ser tocados (rates/pct/scores/datas/flags)
NUMERIC_SKIP = {
    "cdi_anual_pct", "cdi_anual",
    "variacao_90d_pct", "variacao_30d_pct",
    "margem_pct", "vs_empresa_pp",
    "score_jaccard", "diff_pct",
    "ROI",
    "ano_mes", "ano_semana",
    "is_kit", "bate_numericamente", "gerenciar_estoque",
    "produto_variacao_pai",
}

# Strings genéricas a manter (labels, status, datas, configs)
TEXT_SKIP = {
    "data_pedido", "data_referencia", "gerado_em", "ano_mes", "ano_semana",
    "data_semana", "ultima_venda", "snapshot_estoque",
    "cliente_tipo_pessoa", "forma_pagamento", "Recompra",
    "status_inercia", "classe_abc", "situacao",
    "preco_custo_fonte", "tamanho", "nivel_confianca",
}

# Mapping global: namespace -> {valor_original: valor_anonimo}
MAPPING: dict[str, dict[str, str]] = {}


def jitter(v):
    if v is None or (isinstance(v, float) and (pd.isna(v) or not np.isfinite(v))):
        return v
    factor = 1.0 + RNG.uniform(-JITTER, JITTER)
    return v / DIVISOR * factor


def anonymize_text(field: str, value):
    if value is None or value == "":
        return value
    if isinstance(value, float) and pd.isna(value):
        return value
    s = str(value).strip()
    if not s:
        return value
    if field not in TEXT_NAMESPACES:
        return value
    ns, prefix = TEXT_NAMESPACES[field]
    bucket = MAPPING.setdefault(ns, {})
    if s not in bucket:
        bucket[s] = f"{prefix} {len(bucket) + 1}"
    return bucket[s]


def anonymize_id(field: str, value):
    if value is None or value == "":
        return value
    if isinstance(value, float) and pd.isna(value):
        return value
    s = str(value).strip()
    if not s:
        return value
    if field not in ID_NAMESPACES:
        return value
    ns, prefix = ID_NAMESPACES[field]
    bucket = MAPPING.setdefault(ns, {})
    if s not in bucket:
        bucket[s] = f"{prefix}{len(bucket) + 1:05d}"
    return bucket[s]


def transform_numeric(field: str, value):
    if field in NUMERIC_SKIP:
        return value
    if field not in NUMERIC_FIELDS:
        return value
    if value is None:
        return value
    if isinstance(value, bool):
        return value
    if isinstance(value, (int, float)):
        if isinstance(value, float) and (pd.isna(value) or not np.isfinite(value)):
            return value
        out = jitter(float(value))
        if isinstance(value, int) or value == int(value):
            return max(0, int(round(out))) if out is not None else out
        return float(out)
    return value


def walk_obj(obj, parent_key: str = ""):
    """Recursively transform a dict/list in-place style (returns new struct)."""
    if isinstance(obj, dict):
        out = {}
        for k, v in obj.items():
            if isinstance(v, (dict, list)):
                out[k] = walk_obj(v, parent_key=k)
            elif k in ID_NAMESPACES:
                out[k] = anonymize_id(k, v)
            elif k in TEXT_NAMESPACES:
                out[k] = anonymize_text(k, v)
            elif k in NUMERIC_FIELDS and k not in NUMERIC_SKIP:
                out[k] = transform_numeric(k, v)
            else:
                out[k] = v
        return out
    if isinstance(obj, list):
        # listas de dicts: aplicar walk; listas de scalars: depende do parent_key
        out = []
        for item in obj:
            if isinstance(item, (dict, list)):
                out.append(walk_obj(item, parent_key=parent_key))
            elif parent_key in ID_NAMESPACES:
                out.append(anonymize_id(parent_key, item))
            elif parent_key in TEXT_NAMESPACES:
                out.append(anonymize_text(parent_key, item))
            elif parent_key in ("ids_top5",):
                out.append(anonymize_id("id_produto", item))
            elif parent_key in ("nomes_top5", "amostra_skus"):
                out.append(anonymize_text("nome", item))
            else:
                out.append(item)
        return out
    return obj


def anonymize_parquet():
    src = DATA_DIR / "vendas_dash.parquet"
    if not src.exists():
        print(f"[skip] {src} não existe")
        return
    print(f"[parquet] {src}")
    df = pd.read_parquet(src)
    print(f"  shape: {df.shape}")
    for col in df.columns:
        if col in TEXT_NAMESPACES:
            print(f"  text  : {col}")
            # categoricals: aplica mapping então converte de volta
            if pd.api.types.is_categorical_dtype(df[col]):
                cats = df[col].cat.categories.tolist()
                new_cats = [anonymize_text(col, c) for c in cats]
                df[col] = df[col].cat.rename_categories(new_cats)
            else:
                df[col] = df[col].astype("object").map(lambda v: anonymize_text(col, v))
        elif col in ID_NAMESPACES:
            print(f"  id    : {col}")
            if pd.api.types.is_categorical_dtype(df[col]):
                df[col] = df[col].astype("object")
            df[col] = df[col].map(lambda v: anonymize_id(col, v))
        elif col in NUMERIC_FIELDS and col not in NUMERIC_SKIP:
            print(f"  num   : {col} (/3 + jitter)")
            arr = df[col].to_numpy(dtype="float64", na_value=np.nan)
            factor = 1.0 + RNG.uniform(-JITTER, JITTER, size=len(arr))
            arr = arr / DIVISOR * factor
            if pd.api.types.is_integer_dtype(df[col]) or df[col].dtype.kind in ("i", "u"):
                arr = np.where(np.isnan(arr), 0, np.round(arr)).astype("int64")
            else:
                arr = arr.astype("float32")
            df[col] = arr
    # salva em data/ e public-data/ (mesma cópia)
    for out in (DATA_DIR / "vendas_dash.parquet", PUBLIC_DATA_DIR / "vendas_dash.parquet"):
        out.parent.mkdir(parents=True, exist_ok=True)
        df.to_parquet(out, index=False)
    print(f"  saved -> data/, public-data/")


def anonymize_json_file(path: Path):
    print(f"[json] {path.name}")
    try:
        with path.open("r", encoding="utf-8") as f:
            data = json.load(f)
    except Exception as e:
        print(f"  ERROR {e}")
        return

    # Caso especial: mapping_kit_to_simples.json — chaves e valores são id_produto
    if path.name == "mapping_kit_to_simples.json":
        new = {}
        for k, v in data.items():
            new[anonymize_id("id_produto", k)] = anonymize_id("id_produto", v)
        data = new
    # Caso especial: resumo_executivo.json — free text com valores monetários
    elif path.name == "resumo_executivo.json" and "texto" in data:
        data["texto"] = transform_monetary_text(data["texto"])
    else:
        data = walk_obj(data)

    with path.open("w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def transform_monetary_text(text: str) -> str:
    """Multiplica todos os valores R$ N(,N)?[KM]? no texto por 1/3 com jitter."""
    pattern = re.compile(r"R\$\s*([\d.,]+)\s*([KkMmBb]?)")

    def repl(m):
        num_str, suffix = m.group(1), m.group(2).upper()
        try:
            num = float(num_str.replace(".", "").replace(",", "."))
        except ValueError:
            return m.group(0)
        factor = 1.0 + RNG.uniform(-JITTER, JITTER)
        new_num = num / DIVISOR * factor
        if "," in num_str:
            num_fmt = f"{new_num:,.1f}".replace(",", "X").replace(".", ",").replace("X", ".")
        else:
            num_fmt = f"{int(round(new_num))}"
        return f"R$ {num_fmt}{suffix}" if suffix else f"R$ {num_fmt}"

    return pattern.sub(repl, text)


def anonymize_csv(path: Path):
    print(f"[csv] {path.name}")
    df = pd.read_csv(path)
    # normaliza header BOM
    df.columns = [c.lstrip("﻿") for c in df.columns]
    for col in df.columns:
        if col in ID_NAMESPACES:
            print(f"  id    : {col}")
            df[col] = df[col].map(lambda v: anonymize_id(col, v))
        elif col in TEXT_NAMESPACES:
            print(f"  text  : {col}")
            df[col] = df[col].map(lambda v: anonymize_text(col, v))
        elif col in NUMERIC_FIELDS and col not in NUMERIC_SKIP:
            print(f"  num   : {col}")
            df[col] = df[col].astype("float64").map(lambda v: jitter(v) if pd.notna(v) else v)
    df.to_csv(path, index=False)


def main():
    print("=" * 60)
    print(f"ROOT: {ROOT}")
    print(f"DIVISOR: {DIVISOR}  JITTER: ±{int(JITTER*100)}%  SEED: 42")
    print("=" * 60)

    # 1) parquet primeiro — popula o namespace produto/marca/categoria majoritário
    anonymize_parquet()

    # 2) dim_produto.json — popula resto do namespace produto/codigo/fornecedor
    if (RAW_DIR / "dim_produto.json").exists():
        anonymize_json_file(RAW_DIR / "dim_produto.json")

    # 3) demais JSONs em ordem alfabética (mas dim_produto já foi)
    for fp in sorted(RAW_DIR.glob("*.json")):
        if fp.name == "dim_produto.json":
            continue
        anonymize_json_file(fp)

    # 4) CSV
    for fp in sorted(RAW_DIR.glob("*.csv")):
        anonymize_csv(fp)

    # 5) plano_acao.json em data/ (separado do raw)
    for d in (DATA_DIR, PUBLIC_DATA_DIR):
        pa = d / "plano_acao.json"
        if pa.exists():
            anonymize_json_file(pa)

    # 6) persiste mapping
    mapping_path = ROOT / "raw-data" / "_anon_mapping.json"
    summary = {ns: {"count": len(m), "sample": dict(list(m.items())[:5])} for ns, m in MAPPING.items()}
    with mapping_path.open("w", encoding="utf-8") as f:
        json.dump({"summary": summary, "full": MAPPING}, f, ensure_ascii=False, indent=2)
    print()
    print("=" * 60)
    print("MAPPING SUMMARY")
    print("=" * 60)
    for ns, info in summary.items():
        print(f"  {ns}: {info['count']} valores únicos")
        for k, v in info["sample"].items():
            print(f"     {k!r} -> {v!r}")
    print(f"\nMapping completo -> {mapping_path}")


if __name__ == "__main__":
    main()
