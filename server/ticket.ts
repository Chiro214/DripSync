import PDFDocument from 'pdfkit';
import fs from 'fs';
import nodemailer from 'nodemailer';
import path from 'path';

export async function generateAndSendTicket(order: any) {
  // generate a simple PDF ticket
  const outPath = path.join(__dirname, `../tmp/ticket-${order.id}.pdf`);
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(outPath));
  doc.fontSize(20).text('DripSync Ticket', { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).text(`Order: ${order.id}`);
  doc.text(`Event: ${order.eventId}`);
  doc.text(`Amount: ₹${order.amount}`);
  doc.text(`Txn: ${order.txnId || 'N/A'}`);
  doc.end();

  // send email with attachment (configure transporter for your email)
  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // replace with your SMTP host
    port: 587,
    secure: false,
    auth: { user: 'you@example.com', pass: 'emailpassword' }
  });

  await transporter.sendMail({
    from: '"DripSync" <you@example.com>',
    to: order.email,
    subject: `Your ticket — ${order.id}`,
    text: 'Attached is your ticket. Show this at entry.',
    attachments: [{ filename: `ticket-${order.id}.pdf`, path: outPath }]
  });

  // optional: delete file after sending
  fs.unlinkSync(outPath);
}