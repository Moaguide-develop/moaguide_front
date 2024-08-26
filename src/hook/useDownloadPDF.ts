import { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const useDownloadPDF = (
  logoUrl: string,
  reportContentRef: React.RefObject<HTMLDivElement>,
  title: string
) => {
  const downloadPDF = async () => {
    if (!reportContentRef.current) return;

    const contentWithLogo = document.createElement('div');
    contentWithLogo.style.position = 'relative';
    contentWithLogo.style.width = '210mm';
    contentWithLogo.style.height = '297mm';
    contentWithLogo.style.padding = '20mm';
    contentWithLogo.style.boxSizing = 'border-box';

    contentWithLogo.innerHTML = `
      <img src="${logoUrl}" alt="Logo" style="position: absolute; top: 0; left: 0; width: 120px; height: auto;" />
      <div>${reportContentRef.current.innerHTML}</div>
    `;

    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    document.body.appendChild(container);
    container.appendChild(contentWithLogo);

    const canvas = await html2canvas(container, {
      scale: 3
    });
    document.body.removeChild(container);

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgProps = pdf.getImageProperties(imgData);
    const imgRatio = imgProps.width / imgProps.height;
    const pageHeight = pdfHeight - 20;

    let imgWidth = pdfWidth - 20;
    let imgHeight = imgWidth / imgRatio;

    if (imgHeight > pageHeight) {
      imgHeight = pageHeight;
      imgWidth = imgHeight * imgRatio;
    }

    const marginX = (pdfWidth - imgWidth) / 2;
    const marginY = 10;

    pdf.addImage(imgData, 'PNG', marginX, marginY, imgWidth, imgHeight);
    pdf.save(`${title}.pdf`);
  };

  return downloadPDF;
};

export default useDownloadPDF;
