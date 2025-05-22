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
