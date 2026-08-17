import { useEffect, useRef } from 'react';

type RealPersonProps = {
  role: 'courier' | 'keeper' | 'mechanic';
  className: string;
};

const roleIndex = { courier: 0, keeper: 1, mechanic: 2 };

export function RealPerson({ role, className }: RealPersonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    const image = new Image();
    image.src = '/assets/characters-chroma.png';
    image.onload = () => {
      if (!context) return;
      const partWidth = image.width / 3;
      context.drawImage(image, roleIndex[role] * partWidth, 0, partWidth, image.height, 0, 0, canvas.width, canvas.height);
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
      for (let index = 0; index < pixels.data.length; index += 4) {
        const red = pixels.data[index];
        const green = pixels.data[index + 1];
        const blue = pixels.data[index + 2];
        if (green > 120 && green > red * 1.35 && green > blue * 1.35) pixels.data[index + 3] = 0;
        else if (green > red && green > blue) pixels.data[index + 1] = Math.max(red, blue);
      }
      context.putImageData(pixels, 0, 0);
    };
  }, [role]);

  return <canvas ref={canvasRef} className={`real-person ${className}`} width="340" height="680" aria-label={role} />;
}
