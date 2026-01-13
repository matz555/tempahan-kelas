# grader.py - Fail ini mengandungi jawapan sebenar
import subprocess

def semak_tugasan1(jawapan):
    # Topik 1.1.8 - IDE
    valid_answers = ["codeblocks", "vscode", "devc++", "programiz", "googlecolab"]
    if jawapan.lower().replace(" ", "") in valid_answers:
        return "MARKAH: 10/10. Tahniah! Anda faham konsep IDE."
    return "Cuba lagi. Tip: Ia adalah aplikasi tempat anda menulis dan mengkompil kod C."

def semak_tugasan2(ipo_dict):
    # Topik 1.2.2 - Jadual IPO
    inputs = [str(i).lower() for i in ipo_dict.get("INPUT", [])]
    if "unit" in str(inputs) or "watt" in str(inputs):
        return "MARKAH: 20/20. Analisis SDM anda tepat!"
    return "Ralat Logik: Sila pastikan input anda mengandungi pemboleh ubah 'unit'."

def autograde_c(filename, expected_output):
    # Topik 1.1.9 - Kompilasi & Pelaksanaan
    try:
        subprocess.run(['gcc', filename, '-o', 'output_file'], check=True, capture_output=True)
        result = subprocess.run(['./output_file'], capture_output=True, text=True)
        if expected_output in result.stdout:
            return f"MARKAH: 50/50. Output '{result.stdout.strip()}' adalah tepat!"
        return f"Output Salah. Diharapkan '{expected_output}', tetapi dapat '{result.stdout.strip()}'."
    except Exception as e:
        return f"RALAT SINTAKS: Kod tidak dapat dikompil. Sila semak tanda ';' atau typo."
