import QRCode from "react-qr-code";

export default function MyQR() {
  return (
    <div>
      <QRCode
        value="https://youtube.com"
        size={200}
      />
    </div>
  );
}