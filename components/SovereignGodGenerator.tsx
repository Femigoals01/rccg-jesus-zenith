"use client";

import Link from "next/link";
import {
  ChangeEvent,
  PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

/* =========================================================
   CARD CONFIGURATION
========================================================= */

const CARD_WIDTH = 1080;
const CARD_HEIGHT = 1350;

const FLYER_SRC = "/sovereign-god-attendance.png";

const GENERATOR_URL =
  "https://www.rccgjesuszenith.com/choir-concert";

/*
 * The new artwork has a large circular photo opening.
 *
 * These coordinates are based on the 1080 × 1350 template.
 */
const PHOTO_CENTER_X = 540;
const PHOTO_CENTER_Y = 704;
const PHOTO_RADIUS = 292;

type PhotoPosition = {
  x: number;
  y: number;
};

export default function SovereignGodGenerator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const adjustCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const dragRef = useRef({
    dragging: false,
    startX: 0,
    startY: 0,
    originalX: 0,
    originalY: 0,
  });

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  const [photoZoom, setPhotoZoom] = useState(1);
  const [photoRotation, setPhotoRotation] = useState(0);

  const [photoPosition, setPhotoPosition] =
    useState<PhotoPosition>({
      x: 0,
      y: 0,
    });

  const [generating, setGenerating] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);

  /* =========================================================
     LOAD IMAGE
  ========================================================= */

  function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();

      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = src;
    });
  }

  /* =========================================================
     PHOTO UPLOAD
  ========================================================= */

  function handlePhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Please select an image smaller than 10MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setPhoto(reader.result as string);

      setPhotoZoom(1);
      setPhotoRotation(0);

      setPhotoPosition({
        x: 0,
        y: 0,
      });
    };

    reader.readAsDataURL(file);
  }

  /* =========================================================
     DRAW PHOTO WITH COVER BEHAVIOUR
  ========================================================= */

  const drawPhoto = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      image: HTMLImageElement,
      centerX: number,
      centerY: number,
      frameWidth: number,
      frameHeight: number,
      positionMultiplier = 1
    ) => {
      const rotationRadians =
        (photoRotation * Math.PI) / 180;

      const normalizedRotation =
        ((photoRotation % 360) + 360) % 360;

      const quarterTurn =
        normalizedRotation === 90 ||
        normalizedRotation === 270;

      const effectiveWidth = quarterTurn
        ? image.height
        : image.width;

      const effectiveHeight = quarterTurn
        ? image.width
        : image.height;

      const coverScale = Math.max(
        frameWidth / effectiveWidth,
        frameHeight / effectiveHeight
      );

      const finalScale = coverScale * photoZoom;

      const drawWidth = image.width * finalScale;
      const drawHeight = image.height * finalScale;

      ctx.save();

      ctx.translate(
        centerX + photoPosition.x * positionMultiplier,
        centerY + photoPosition.y * positionMultiplier
      );

      ctx.rotate(rotationRadians);

      ctx.drawImage(
        image,
        -drawWidth / 2,
        -drawHeight / 2,
        drawWidth,
        drawHeight
      );

      ctx.restore();
    },
    [
      photoPosition.x,
      photoPosition.y,
      photoRotation,
      photoZoom,
    ]
  );

  /* =========================================================
     ROUNDED RECTANGLE
  ========================================================= */

  function roundedRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) {
    const r = Math.min(radius, width / 2, height / 2);

    ctx.beginPath();

    ctx.moveTo(x + r, y);
    ctx.lineTo(x + width - r, y);

    ctx.quadraticCurveTo(
      x + width,
      y,
      x + width,
      y + r
    );

    ctx.lineTo(
      x + width,
      y + height - r
    );

    ctx.quadraticCurveTo(
      x + width,
      y + height,
      x + width - r,
      y + height
    );

    ctx.lineTo(x + r, y + height);

    ctx.quadraticCurveTo(
      x,
      y + height,
      x,
      y + height - r
    );

    ctx.lineTo(x, y + r);

    ctx.quadraticCurveTo(
      x,
      y,
      x + r,
      y
    );

    ctx.closePath();
  }

  /* =========================================================
     FIT NAME
  ========================================================= */

  function getFittedFontSize(
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number,
    startingSize: number,
    minimumSize: number
  ) {
    let size = startingSize;

    while (size > minimumSize) {
      ctx.font =
        `900 ${size}px Arial Black, Arial, sans-serif`;

      if (ctx.measureText(text).width <= maxWidth) {
        return size;
      }

      size -= 2;
    }

    return minimumSize;
  }

  /* =========================================================
     PHOTO ADJUSTMENT PREVIEW
  ========================================================= */

  const drawAdjustmentPreview = useCallback(async () => {
    const canvas = adjustCanvasRef.current;

    if (!canvas || !photo) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const size = 360;
    const center = size / 2;
    const radius = 162;

    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, size, size);

    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, size, size);

    try {
      const image = await loadImage(photo);

      ctx.save();

      ctx.beginPath();

      ctx.arc(
        center,
        center,
        radius,
        0,
        Math.PI * 2
      );

      ctx.closePath();
      ctx.clip();

      const positionMultiplier =
        radius / PHOTO_RADIUS;

      drawPhoto(
        ctx,
        image,
        center,
        center,
        radius * 2,
        radius * 2,
        positionMultiplier
      );

      ctx.restore();
    } catch (error) {
      console.error(
        "Could not draw adjustment preview:",
        error
      );
    }

    /*
     * Dark outside mask
     */

    ctx.save();

    ctx.beginPath();
    ctx.rect(0, 0, size, size);

    ctx.arc(
      center,
      center,
      radius,
      0,
      Math.PI * 2,
      true
    );

    ctx.fillStyle = "rgba(0,0,0,.58)";
    ctx.fill("evenodd");

    ctx.restore();

    /*
     * Outer guide
     */

    ctx.beginPath();

    ctx.arc(
      center,
      center,
      radius,
      0,
      Math.PI * 2
    );

    ctx.strokeStyle = "#FACC15";
    ctx.lineWidth = 4;
    ctx.stroke();

    /*
     * Safe face guide
     */

    ctx.beginPath();

    ctx.arc(
      center,
      center,
      radius * 0.7,
      0,
      Math.PI * 2
    );

    ctx.strokeStyle =
      "rgba(255,255,255,.25)";

    ctx.lineWidth = 2;

    ctx.setLineDash([8, 8]);
    ctx.stroke();

    ctx.setLineDash([]);

    /*
     * Center guide
     */

    ctx.strokeStyle =
      "rgba(255,255,255,.28)";

    ctx.lineWidth = 1;

    ctx.beginPath();

    ctx.moveTo(
      center,
      center - 32
    );

    ctx.lineTo(
      center,
      center + 32
    );

    ctx.moveTo(
      center - 32,
      center
    );

    ctx.lineTo(
      center + 32,
      center
    );

    ctx.stroke();
  }, [
    photo,
    drawPhoto,
  ]);

  useEffect(() => {
    drawAdjustmentPreview();
  }, [drawAdjustmentPreview]);

  /* =========================================================
     DRAG PHOTO
  ========================================================= */

  function handlePointerDown(
    event: ReactPointerEvent<HTMLCanvasElement>
  ) {
    if (!photo) return;

    event.currentTarget.setPointerCapture(
      event.pointerId
    );

    dragRef.current = {
      dragging: true,

      startX: event.clientX,
      startY: event.clientY,

      originalX: photoPosition.x,
      originalY: photoPosition.y,
    };
  }

  function handlePointerMove(
    event: ReactPointerEvent<HTMLCanvasElement>
  ) {
    if (!dragRef.current.dragging) return;

    const rect =
      event.currentTarget.getBoundingClientRect();

    /*
     * Convert movement in the adjustment window
     * back into full-resolution card coordinates.
     */

    const previewDiameter =
      rect.width * 0.9;

    const scale =
      (PHOTO_RADIUS * 2) /
      previewDiameter;

    const deltaX =
      (event.clientX -
        dragRef.current.startX) *
      scale;

    const deltaY =
      (event.clientY -
        dragRef.current.startY) *
      scale;

    const maximumMovement = 300;

    setPhotoPosition({
      x: Math.max(
        -maximumMovement,
        Math.min(
          maximumMovement,
          dragRef.current.originalX +
            deltaX
        )
      ),

      y: Math.max(
        -maximumMovement,
        Math.min(
          maximumMovement,
          dragRef.current.originalY +
            deltaY
        )
      ),
    });
  }

  function handlePointerUp(
    event: ReactPointerEvent<HTMLCanvasElement>
  ) {
    dragRef.current.dragging = false;

    try {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    } catch {
      // Pointer may already have been released.
    }
  }

  /* =========================================================
     PHOTO CONTROLS
  ========================================================= */

  function rotatePhotoLeft() {
    setPhotoRotation(
      (current) => current - 90
    );
  }

  function rotatePhotoRight() {
    setPhotoRotation(
      (current) => current + 90
    );
  }

  function resetPhotoAdjustment() {
    setPhotoZoom(1);
    setPhotoRotation(0);

    setPhotoPosition({
      x: 0,
      y: 0,
    });
  }

  /* =========================================================
     DRAW FINAL CARD
  ========================================================= */

  const drawCard = useCallback(async () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    setPreviewReady(false);

    canvas.width = CARD_WIDTH;
    canvas.height = CARD_HEIGHT;

    ctx.clearRect(
      0,
      0,
      CARD_WIDTH,
      CARD_HEIGHT
    );

    /*
     * IMPORTANT:
     *
     * The photo is drawn FIRST.
     *
     * The attendance template is then drawn OVER it.
     *
     * This allows the black circle in the template to act
     * visually as the designed photo area while keeping
     * all artwork, typography and decorations intact.
     */

    if (photo) {
      try {
        const userImage =
          await loadImage(photo);

        ctx.save();

        ctx.beginPath();

        ctx.arc(
          PHOTO_CENTER_X,
          PHOTO_CENTER_Y,
          PHOTO_RADIUS,
          0,
          Math.PI * 2
        );

        ctx.closePath();
        ctx.clip();

        drawPhoto(
          ctx,
          userImage,
          PHOTO_CENTER_X,
          PHOTO_CENTER_Y,
          PHOTO_RADIUS * 2,
          PHOTO_RADIUS * 2
        );

        ctx.restore();
      } catch (error) {
        console.error(
          "Could not draw attendee photograph:",
          error
        );
      }
    } else {
      /*
       * Placeholder
       */

      ctx.beginPath();

      ctx.arc(
        PHOTO_CENTER_X,
        PHOTO_CENTER_Y,
        PHOTO_RADIUS,
        0,
        Math.PI * 2
      );

      ctx.fillStyle = "#090909";
      ctx.fill();

      ctx.fillStyle =
        "rgba(255,255,255,.55)";

      ctx.textAlign = "center";

      ctx.font =
        "900 24px Arial, sans-serif";

      ctx.fillText(
        "YOUR PHOTO",
        PHOTO_CENTER_X,
        PHOTO_CENTER_Y
      );
    }

    /*
     * LOAD TEMPLATE
     */

    try {
      const flyer =
        await loadImage(FLYER_SRC);

      /*
       * Since the template contains a solid black circle,
       * drawing the entire template here would cover the
       * photograph.
       *
       * Therefore we draw the full template first below,
       * then redraw the photo above it.
       */

      ctx.clearRect(
        0,
        0,
        CARD_WIDTH,
        CARD_HEIGHT
      );

      ctx.drawImage(
        flyer,
        0,
        0,
        CARD_WIDTH,
        CARD_HEIGHT
      );

      /*
       * Now insert attendee photo directly over
       * the black circular placeholder.
       */

      if (photo) {
        const userImage =
          await loadImage(photo);

        ctx.save();

        ctx.beginPath();

        ctx.arc(
          PHOTO_CENTER_X,
          PHOTO_CENTER_Y,
          PHOTO_RADIUS,
          0,
          Math.PI * 2
        );

        ctx.closePath();
        ctx.clip();

        drawPhoto(
          ctx,
          userImage,
          PHOTO_CENTER_X,
          PHOTO_CENTER_Y,
          PHOTO_RADIUS * 2,
          PHOTO_RADIUS * 2
        );

        ctx.restore();
      } else {
        ctx.beginPath();

        ctx.arc(
          PHOTO_CENTER_X,
          PHOTO_CENTER_Y,
          PHOTO_RADIUS - 3,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = "#050505";
        ctx.fill();

        ctx.fillStyle =
          "rgba(255,255,255,.55)";

        ctx.textAlign = "center";

        ctx.font =
          "900 25px Arial, sans-serif";

        ctx.fillText(
          "YOUR PHOTO",
          PHOTO_CENTER_X,
          PHOTO_CENTER_Y
        );
      }
    } catch (error) {
      console.error(
        "Could not load attendance template:",
        error
      );

      ctx.fillStyle = "#FACC15";

      ctx.fillRect(
        0,
        0,
        CARD_WIDTH,
        CARD_HEIGHT
      );

      ctx.fillStyle = "#000";

      ctx.textAlign = "center";

      ctx.font =
        "900 28px Arial, sans-serif";

      ctx.fillText(
        "Unable to load attendance card template.",
        CARD_WIDTH / 2,
        CARD_HEIGHT / 2
      );

      return;
    }

    /* =====================================================
       SUBTLE PHOTO BORDER
    ===================================================== */

    ctx.beginPath();

    ctx.arc(
      PHOTO_CENTER_X,
      PHOTO_CENTER_Y,
      PHOTO_RADIUS,
      0,
      Math.PI * 2
    );

    ctx.strokeStyle = "#FACC15";
    ctx.lineWidth = 5;
    ctx.stroke();

    /* =====================================================
       NAME PLATE
    ===================================================== */

    const displayName =
      name.trim().toUpperCase() ||
      "YOUR NAME";

    /*
     * Position name plate near the bottom of the photo
     * but still inside the circular portrait.
     */

    const plateWidth = 610;
    const plateHeight = 82;

    const plateX =
      CARD_WIDTH / 2 -
      plateWidth / 2;

    const plateY = 903;

    ctx.save();

    ctx.shadowColor =
      "rgba(0,0,0,.45)";

    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 6;

    roundedRect(
      ctx,
      plateX,
      plateY,
      plateWidth,
      plateHeight,
      41
    );

    ctx.fillStyle =
      "rgba(0,0,0,.88)";

    ctx.fill();

    ctx.restore();

    /*
     * Pink left accent
     */

    roundedRect(
      ctx,
      plateX,
      plateY,
      14,
      plateHeight,
      7
    );

    ctx.fillStyle = "#E9007F";
    ctx.fill();

    /*
     * Yellow right accent
     */

    roundedRect(
      ctx,
      plateX +
        plateWidth -
        14,
      plateY,
      14,
      plateHeight,
      7
    );

    ctx.fillStyle = "#FACC15";
    ctx.fill();

    /*
     * Name
     */

    const nameSize =
      getFittedFontSize(
        ctx,
        displayName,
        plateWidth - 80,
        40,
        23
      );

    ctx.textAlign = "center";

    ctx.textBaseline = "middle";

    ctx.fillStyle = "#FFFFFF";

    ctx.font =
      `900 ${nameSize}px Arial Black, Arial, sans-serif`;

    ctx.fillText(
      displayName,
      CARD_WIDTH / 2,
      plateY + plateHeight / 2
    );

    ctx.textBaseline = "alphabetic";

    /* =====================================================
       SMALL PERSONALIZED LABEL
    ===================================================== */

    const label = "SEE YOU AT SOVEREIGN GOD";

    const labelWidth = 285;
    const labelHeight = 34;

    const labelX =
      CARD_WIDTH / 2 -
      labelWidth / 2;

    const labelY =
      plateY - 43;

    roundedRect(
      ctx,
      labelX,
      labelY,
      labelWidth,
      labelHeight,
      17
    );

    ctx.fillStyle = "#E9007F";
    ctx.fill();

    ctx.fillStyle = "#FFFFFF";

    ctx.textAlign = "center";

    ctx.font =
      "900 12px Arial, sans-serif";

    ctx.fillText(
      label,
      CARD_WIDTH / 2,
      labelY + 22
    );

    setPreviewReady(true);
  }, [
    name,
    photo,
    drawPhoto,
  ]);

  /* =========================================================
     LIVE PREVIEW
  ========================================================= */

  useEffect(() => {
    drawCard();
  }, [drawCard]);

  /* =========================================================
     DOWNLOAD
  ========================================================= */

  async function downloadCard() {
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!photo) {
      alert("Please upload your photograph.");
      return;
    }

    setGenerating(true);

    try {
      await drawCard();

      const canvas =
        canvasRef.current;

      if (!canvas) return;

      const safeName = name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const link =
        document.createElement("a");

      link.download =
        `sovereign-god-${
          safeName || "attending"
        }.png`;

      link.href =
        canvas.toDataURL(
          "image/png",
          1
        );

      link.click();
    } finally {
      setGenerating(false);
    }
  }

  /* =========================================================
     SHARE
  ========================================================= */

  async function shareCard() {
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!photo) {
      alert("Please upload your photograph.");
      return;
    }

    setSharing(true);

    try {
      await drawCard();

      const canvas =
        canvasRef.current;

      if (!canvas) return;

      const blob =
        await new Promise<Blob | null>(
          (resolve) => {
            canvas.toBlob(
              resolve,
              "image/png",
              1
            );
          }
        );

      if (!blob) {
        alert(
          "We could not prepare your attendance card."
        );

        return;
      }

      const safeName = name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const file = new File(
        [blob],
        `sovereign-god-${
          safeName || "attending"
        }.png`,
        {
          type: "image/png",
        }
      );

      /*
       * Keep URL only in the message text.
       * Do NOT also supply navigator.share({ url: ... })
       * because WhatsApp may display it twice.
       */

      const shareText =
        `I'll be attending SOVEREIGN GOD at RCCG Jesus Zenith! 🎶\n\n` +
        `Join me on Sunday, October 11 at 11AM.\n\n` +
        `Create your attendance card:\n${GENERATOR_URL}`;

      if (
        navigator.share &&
        navigator.canShare?.({
          files: [file],
        })
      ) {
        try {
          await navigator.share({
            title:
              "Sovereign God — RCCG Jesus Zenith",

            text: shareText,

            files: [file],
          });

          return;
        } catch (error) {
          if (
            error instanceof DOMException &&
            error.name === "AbortError"
          ) {
            return;
          }

          console.error(
            "Native share error:",
            error
          );
        }
      }

      /*
       * FALLBACK
       */

      try {
        await navigator.clipboard.writeText(
          shareText
        );

        alert(
          "Your invitation text and attendance-card link have been copied. Download your card and share it together with the copied message."
        );
      } catch {
        alert(
          `Download your card and share it with this link: ${GENERATOR_URL}`
        );
      }
    } catch (error) {
      console.error(
        "Share error:",
        error
      );

      alert(
        "We could not open sharing on this device. Please download your card and share it manually."
      );
    } finally {
      setSharing(false);
    }
  }

  /* =========================================================
     UI
  ========================================================= */

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      {/* BACKGROUND */}

      <div className="pointer-events-none absolute left-1/2 top-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-zenithGold/[0.05] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        {/* =====================================================
            HOME
        ===================================================== */}

        <div className="mb-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-5 py-2.5 text-sm font-semibold text-white/70 backdrop-blur-md transition-all duration-300 hover:border-zenithGold/50 hover:bg-zenithGold/10 hover:text-zenithGold"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.07] transition-all duration-300 group-hover:-translate-x-1 group-hover:bg-zenithGold group-hover:text-black">
              ←
            </span>

            Back to Home
          </Link>
        </div>

        {/* =====================================================
            INTRO
        ===================================================== */}

        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-zenithGold">
            RCCG Jesus Zenith • Choir Concert
          </p>

          <h1 className="mt-4 text-4xl font-black text-white sm:text-5xl lg:text-6xl">
            I Will Be

            <span className="text-zenithGold">
              {" "}Attending
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
            Create your personalized Sovereign God attendance
            card. Upload your picture, position it perfectly,
            add your name and share it with your friends.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white/60">
              Sunday, Oct. 11
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white/60">
              11AM
            </span>

            <span className="rounded-full border border-zenithGold/20 bg-zenithGold/10 px-4 py-2 text-xs font-bold text-zenithGold">
              Sovereign God
            </span>
          </div>
        </div>

        {/* =====================================================
            GENERATOR
        ===================================================== */}

        <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          {/* CONTROLS */}

          <div className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.06] shadow-2xl backdrop-blur-xl">
              <div className="border-b border-white/10 p-7 sm:p-9">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-zenithGold">
                  Personalize Your Card
                </p>

                <h2 className="mt-3 text-3xl font-black text-white">
                  Add Your Photo
                  <span className="block text-zenithGold">
                    & Your Name
                  </span>
                </h2>
              </div>

              <div className="space-y-6 p-7 sm:p-9">
                {/* NAME */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-white">
                    Your Full Name
                  </label>

                  <input
                    type="text"
                    value={name}
                    maxLength={50}
                    onChange={(event) =>
                      setName(
                        event.target.value
                      )
                    }
                    placeholder="e.g. Osuntunde Babafemi"
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-white outline-none transition placeholder:text-white/30 focus:border-zenithGold"
                  />
                </div>

                {/* UPLOAD */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-white">
                    Your Photograph
                  </label>

                  <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-black/20 px-6 py-7 text-center transition hover:border-zenithGold/60 hover:bg-black/30">
                    {photo ? (
                      <div className="mb-3 h-20 w-20 overflow-hidden rounded-full border-2 border-zenithGold">
                        <img
                          src={photo}
                          alt="Selected photograph"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <span className="text-3xl">
                        📷
                      </span>
                    )}

                    <span className="mt-3 font-semibold text-white group-hover:text-zenithGold">
                      {photo
                        ? "Change Photograph"
                        : "Choose Photograph"}
                    </span>

                    <span className="mt-1 text-xs text-white/40">
                      JPG, PNG or WebP • Maximum 10MB
                    </span>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhoto}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* =================================================
                    ADJUST PHOTO
                ================================================= */}

                {photo && (
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/25">
                    <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
                      <div>
                        <p className="text-sm font-bold text-white">
                          Adjust Photograph
                        </p>

                        <p className="mt-1 text-xs text-white/40">
                          Drag, zoom or rotate your photograph.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={
                          resetPhotoAdjustment
                        }
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-bold text-white/60 transition hover:border-zenithGold/50 hover:text-zenithGold"
                      >
                        Reset
                      </button>
                    </div>

                    <div className="p-5">
                      {/* PHOTO EDITOR */}

                      <div className="mx-auto max-w-[280px]">
                        <div className="relative aspect-square overflow-hidden rounded-2xl bg-black">
                          <canvas
                            ref={
                              adjustCanvasRef
                            }
                            onPointerDown={
                              handlePointerDown
                            }
                            onPointerMove={
                              handlePointerMove
                            }
                            onPointerUp={
                              handlePointerUp
                            }
                            onPointerCancel={
                              handlePointerUp
                            }
                            className="h-full w-full cursor-grab touch-none select-none active:cursor-grabbing"
                          />

                          <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/70 px-3 py-1.5 text-[10px] font-bold text-white/75">
                            Drag photo to reposition
                          </div>
                        </div>
                      </div>

                      {/* ZOOM */}

                      <div className="mt-6">
                        <div className="mb-3 flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">
                            Zoom
                          </span>

                          <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] font-bold text-zenithGold">
                            {photoZoom.toFixed(1)}
                            ×
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-white/40">
                            −
                          </span>

                          <input
                            type="range"
                            min="1"
                            max="3"
                            step="0.05"
                            value={photoZoom}
                            onChange={(event) =>
                              setPhotoZoom(
                                Number(
                                  event.target
                                    .value
                                )
                              )
                            }
                            className="w-full accent-[#FACC15]"
                          />

                          <span className="text-white/60">
                            +
                          </span>
                        </div>
                      </div>

                      {/* ROTATE */}

                      <div className="mt-5 grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={
                            rotatePhotoLeft
                          }
                          className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-semibold text-white transition hover:border-zenithGold/50"
                        >
                          ↺ Rotate Left
                        </button>

                        <button
                          type="button"
                          onClick={
                            rotatePhotoRight
                          }
                          className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-semibold text-white transition hover:border-zenithGold/50"
                        >
                          Rotate Right ↻
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* =================================================
                    ACTIONS
                ================================================= */}

                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={downloadCard}
                    disabled={
                      generating ||
                      sharing
                    }
                    className="rounded-xl bg-zenithGold px-5 py-3.5 font-bold text-black transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {generating
                      ? "Creating..."
                      : "Download Card"}
                  </button>

                  <button
                    type="button"
                    onClick={shareCard}
                    disabled={
                      generating ||
                      sharing
                    }
                    className="rounded-xl border border-white/15 bg-white/5 px-5 py-3.5 font-bold text-white transition hover:border-zenithGold/50 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {sharing
                      ? "Preparing..."
                      : "Share Card"}
                  </button>
                </div>

                <p className="text-center text-xs leading-5 text-white/35">
                  🔒 Your photograph is processed in your browser
                  and is not stored by Jesus Zenith.
                </p>
              </div>
            </div>
          </div>

          {/* =====================================================
              CARD PREVIEW
          ===================================================== */}

          <div>
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-zenithGold">
                Live Preview
              </p>

              <h3 className="mt-2 text-xl font-bold text-white">
                Your Attendance Card
              </h3>

              <p className="mt-1 text-sm text-white/40">
                Your photograph and name update automatically.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-black/20 p-3 shadow-2xl sm:p-5">
              {!previewReady && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60">
                  <span className="text-sm font-semibold text-white/60">
                    Preparing preview...
                  </span>
                </div>
              )}

              <canvas
                ref={canvasRef}
                className="h-auto w-full rounded-[20px]"
              />
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-white/35">
              <span>✓ Official artwork</span>
              <span>✓ Adjustable photo</span>
              <span>✓ Personalized name</span>
              <span>✓ High-resolution PNG</span>
            </div>
          </div>
        </div>

        {/* =====================================================
            RETURN HOME
        ===================================================== */}

        <div className="mt-16 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/45 transition hover:text-zenithGold"
          >
            ← Return to RCCG Jesus Zenith Home
          </Link>
        </div>
      </div>
    </section>
  );
}