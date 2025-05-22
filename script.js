// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    // Ajustar el tamaño del canvas para una mejor resolución
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawScene();
    }

    // Dibujar la escena
    function drawScene() {
        const rc = rough.canvas(canvas);
        
        // Dibujar el cielo (parte superior)
        rc.rectangle(0, 0, canvas.width, canvas.height * 0.7, {
            fill: '#87CEEB',
            fillStyle: 'zigzag',
            roughness: 2,
            hachureAngle: 60
        });

        // Dibujar el césped (parte inferior)
        rc.rectangle(0, canvas.height * 0.7, canvas.width, canvas.height * 0.3, {
            fill: '#90EE90',
            fillStyle: 'cross-hatch',
            roughness: 2,
            hachureAngle: 45
        });

        // Calcular dimensiones base para Caperucita
        const centerX = canvas.width / 2;
        const groundY = canvas.height * 0.7; // Línea del suelo
        const bodyRadius = Math.min(canvas.width, canvas.height) * 0.07; // Radio del cuerpo
        const headRadius = bodyRadius * 0.8; // Radio de la cabeza (20% más pequeña que el cuerpo)
        const basketSize = headRadius * 0.8; // Tamaño de la canasta (más pequeña que la cabeza)

        // Dibujar el cuerpo (círculo rojo)
        rc.circle(centerX, groundY - bodyRadius, bodyRadius * 2, {
            fill: '#FF0000',
            fillStyle: 'zigzag',
            roughness: 1.5,
            stroke: '#8B0000',
            strokeWidth: 2,
            hachureGap: 5
        });

        // Dibujar la cabeza (gota invertida roja)
        const headBottom = groundY - bodyRadius * 2; // Justo donde termina el círculo
        const headTop = headBottom - bodyRadius * 1.5; // Altura proporcional al cuerpo
        const headPoints = [
            [centerX - headRadius, headBottom],  // Base izquierda
            [centerX + headRadius, headBottom],  // Base derecha
            [centerX, headTop]                   // Punta superior
        ];
        rc.polygon(headPoints, {
            fill: '#FF0000',
            fillStyle: 'zigzag',
            roughness: 1.5,
            stroke: '#8B0000',
            strokeWidth: 2,
            hachureGap: 5
        });

        // Dibujar la cara (círculo color piel)
        const faceRadius = headRadius * 0.6; // Radio de la cara proporcionado al tamaño de la cabeza
        const faceY = headBottom - faceRadius; // Posición Y de la cara (justo en la base del triángulo)
        rc.circle(centerX, faceY, faceRadius * 2, {
            fill: '#FFE0BD', // Color piel
            fillStyle: 'solid',
            roughness: 1.5,
            stroke: '#DEB887',
            strokeWidth: 1
        });

        // Dibujar los ojos
        const eyeRadius = faceRadius * 0.2; // Radio de los ojos
        const eyeOffset = faceRadius * 0.4; // Distancia desde el centro de la cara
        
        // Ojo izquierdo
        rc.circle(centerX - eyeOffset, faceY, eyeRadius * 2, {
            fill: '#000000',
            fillStyle: 'zigzag',
            roughness: 1,
            stroke: '#000000',
            strokeWidth: 1,
            hachureGap: 2
        });

        // Ojo derecho
        rc.circle(centerX + eyeOffset, faceY, eyeRadius * 2, {
            fill: '#000000',
            fillStyle: 'zigzag',
            roughness: 1,
            stroke: '#000000',
            strokeWidth: 1,
            hachureGap: 2
        });

        // Dibujar la canasta (cuadrado marrón)
        rc.rectangle(
            centerX + bodyRadius * 1.2,     // Posición X (un poco separada del cuerpo)
            groundY - basketSize * 1.2,     // Posición Y (alineada con el cuerpo)
            basketSize,                     // Ancho
            basketSize,                     // Alto
            {
                fill: '#DEB887',
                fillStyle: 'cross-hatch',
                roughness: 2,
                stroke: '#8B4513',
                strokeWidth: 2
            }
        );

        // Dibujar el título
        const fontSize = canvas.width * 0.05;
        ctx.font = `${fontSize}px Arial`;
        ctx.textAlign = 'center';
        
        // Dibujar el texto con efecto de bosquejo
        const text = 'Caperucita Roja';
        const x = canvas.width / 2;
        const y = canvas.height * 0.1;
        
        // Crear efecto de bosquejo para el texto
        rc.draw(rc.generator.linearPath([[x - ctx.measureText(text).width/2, y], 
                                      [x + ctx.measureText(text).width/2, y]], {
            roughness: 2.5,
            stroke: '#000',
            strokeWidth: fontSize/20
        }));

        ctx.fillStyle = '#8B0000';
        ctx.fillText(text, x, y);
    }

    // Manejar el redimensionamiento de la ventana
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
});
