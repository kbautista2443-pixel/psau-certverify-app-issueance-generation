"use client";
import { Canvas, FabricImage } from "fabric";
import { QRCode } from "@/features/editor/lib/utils"; // your editor’s QR class
import { PLACEHOLDER_CONFIG, QR_CODE_STYLE, VARIANT_CONFIG } from "@/features/editor/lib/constants/placeholder";
import { useTemplateStore } from "@/features/editor/lib/stores";
import { Textbox } from "fabric";

export async function insertImage(canvas: Canvas, folder: string) {
  const { id } = useTemplateStore.getState();
  const qrData = `${id}`; // Dynamic QR content based on template ID

  // --- Background image ---
  const bgUrl = `/defaults/${folder}/template-bg.jpg`;
  const bgImg = await FabricImage.fromURL(bgUrl);
  if (bgImg) {
    const canvasWidth = canvas.getWidth();
    const canvasHeight = canvas.getHeight();

    bgImg.set({
      scaleX: 0.3659763171887207,
      scaleY: 0.3891029061712685,
      left: canvasWidth / 2,
      top: canvasHeight / 2,
      originX: "center",
      originY: "center",
      selectable: true,
    });

    canvas.add(bgImg);
  } 

const qr = new QRCode(qrData, {
    ...QR_CODE_STYLE, // backgroundColor, fill, width, height, margin
    left: canvas.getWidth() / 1.5 - 25,
    top: canvas.getHeight() / 1.6,
    originX: "left",
    originY: "top",
    selectable: true,
    evented: true, // allow interactions
    });
    (qr as any).isPlaceholder = true;
    (qr as any).variant = "qr-code";
    (qr as any).name = "QR Code";

const variant = VARIANT_CONFIG.recipient; 
const namePlaceholder = new Textbox(variant.text, {
     ...PLACEHOLDER_CONFIG, ...variant,
    left: canvas.getWidth() / 2,
    top: canvas.getHeight() / 2,
    width: 500,
    originX: "center",
    originY: "center",
    selectable: true,

    isPlaceholder: true,
    variant: "{{recipient}}",
  }); 

  canvas.add(namePlaceholder);
  canvas.add(qr);
  canvas.requestRenderAll();
};