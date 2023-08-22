import subprocess
import os


class toHtml:
    def pdf_to_html(self,input_path, output_path):
        # Run pdf2htmlEX command
        restult = subprocess.run(["./python/poppler-0.68.0_x86/poppler-0.68.0/bin/pdftohtml.exe", "-c", "-noframes", input_path, output_path], capture_output=True, check=True)
        return restult;

# Example usage
""" pdf_to_html('./python/sislabra.pdf', './teste') """
objeto = toHtml();
i = objeto.pdf_to_html('./python/sislabra.pdf', './teste');
