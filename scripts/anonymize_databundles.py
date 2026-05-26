"""
Pós-processador para anonimizar os bundles *-data.js já compilados.

Cada *-data.js tem o formato `window.NOME_DATA = {JSON...};` (ou similar).
Extrai o JSON, aplica anonimização recursiva usando o MESMO mapping do
anonymize_data.py (carrega de raw-data/_anon_mapping.json), e reescreve.

Idempotente. Roda DEPOIS de anonymize_data.py.
"""
import json
import re
import sys
from pathlib import Path
import numpy as np

# Reusa as funções/sets do script principal
sys.path.insert(0, str(Path(__file__).resolve().parent))
from anonymize_data import (
    TEXT_NAMESPACES, ID_NAMESPACES, NUMERIC_FIELDS, NUMERIC_SKIP,
    walk_obj, anonymize_text, anonymize_id, transform_numeric, MAPPING,
)
import anonymize_data as ad

ROOT = Path(__file__).resolve().parents[1]
MAPPING_PATH = ROOT / "raw-data" / "_anon_mapping.json"

# Carrega mapping persistido + popula MAPPING global
if MAPPING_PATH.exists():
    saved = json.load(MAPPING_PATH.open("r", encoding="utf-8"))["full"]
    MAPPING.update(saved)
    ad.MAPPING.update(saved)
    print(f"Loaded mapping: {sum(len(m) for m in MAPPING.values())} entries across {len(MAPPING)} namespaces")

# Re-seed o RNG do anonymize_data para que jitter pós-bundle seja independente
ad.RNG = np.random.default_rng(43)

PATTERN = re.compile(
    r"^(?P<prefix>(?:window\.|var\s+|const\s+|let\s+)?[A-Za-z_][\w.]*\s*=\s*)"
    r"(?P<json>\{.*\}|\[.*\])"
    r"(?P<suffix>;?\s*)$",
    re.DOTALL,
)


def process_bundle(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    m = PATTERN.match(text.strip())
    if not m:
        return False
    raw = m.group("json")
    try:
        data = json.loads(raw)
    except json.JSONDecodeError as e:
        print(f"  [skip] {path.name}: JSON parse error {e}")
        return False

    anon = walk_obj(data)
    new_json = json.dumps(anon, ensure_ascii=False, separators=(",", ":"))
    new_text = m.group("prefix") + new_json + m.group("suffix").rstrip() + "\n"
    path.write_text(new_text, encoding="utf-8")
    return True


def main():
    bundles = sorted(ROOT.glob("*-data.js"))
    print(f"Processing {len(bundles)} bundles...")
    for fp in bundles:
        ok = process_bundle(fp)
        print(f"  {'OK ' if ok else 'SKP'} {fp.name}")

    # persist updated mapping
    summary = {ns: {"count": len(m), "sample": dict(list(m.items())[:5])}
               for ns, m in MAPPING.items()}
    with MAPPING_PATH.open("w", encoding="utf-8") as f:
        json.dump({"summary": summary, "full": MAPPING}, f, ensure_ascii=False, indent=2)
    print()
    print(f"Mapping atualizado -> {MAPPING_PATH}")
    for ns, info in summary.items():
        print(f"  {ns:14} {info['count']:>6}")


if __name__ == "__main__":
    main()
