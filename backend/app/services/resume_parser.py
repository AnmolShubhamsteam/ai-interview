from io import BytesIO
from typing import Optional

import docx2txt
from pdfminer.high_level import extract_text

async def extract_resume_text(file_bytes: bytes, filename: str) -> Optional[str]:
    if filename.lower().endswith(".pdf"):
        with BytesIO(file_bytes) as f:
            return extract_text(f)
    if filename.lower().endswith(".docx"):
        with BytesIO(file_bytes) as f:
            return docx2txt.process(f)
    return None
