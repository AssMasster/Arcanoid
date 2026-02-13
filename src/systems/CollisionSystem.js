export class CollisionSystem {
    detectBallPaddle(ball, paddle) {
        const ballBounds = ball.getBounds();
        const paddleBounds = paddle.getBounds();
        
        return ballBounds.bottom >= paddleBounds.top &&
               ballBounds.right >= paddleBounds.left &&
               ballBounds.left <= paddleBounds.right;
    }

    detectBallBrick(ball, brick) {
        if (!brick.isActive) return null;
        
        const ballBounds = ball.getBounds();
        const brickBounds = brick.getBounds();
        
        if (ballBounds.right < brickBounds.left || 
            ballBounds.left > brickBounds.right ||
            ballBounds.bottom < brickBounds.top ||
            ballBounds.top > brickBounds.bottom) {
            return null;
        }
        
        // Определяем сторону столкновения
        const overlapLeft = ballBounds.right - brickBounds.left;
        const overlapRight = brickBounds.right - ballBounds.left;
        const overlapTop = ballBounds.bottom - brickBounds.top;
        const overlapBottom = brickBounds.bottom - ballBounds.top;
        
        const minXOverlap = Math.min(overlapLeft, overlapRight);
        const minYOverlap = Math.min(overlapTop, overlapBottom);
        
        if (minXOverlap < minYOverlap) {
            return { side: 'x', brick, ball };
        } else {
            return { side: 'y', brick, ball };
        }
    }

    detectBallWalls(ball, canvasWidth, canvasHeight) {
        const bounds = ball.getBounds();
        const collisions = [];
        
        if (bounds.left <= 0) collisions.push({ side: 'left' });
        if (bounds.right >= canvasWidth) collisions.push({ side: 'right' });
        if (bounds.top <= 0) collisions.push({ side: 'top' });
        if (bounds.bottom >= canvasHeight) collisions.push({ side: 'bottom' });
        
        return collisions;
    }

    resolveCollision(collision) {
        if (!collision) return null;
        
        if (collision.side === 'x') {
            return { type: 'bounceX', brick: collision.brick };
        } else if (collision.side === 'y') {
            return { type: 'bounceY', brick: collision.brick };
        }
        
        return null;
    }
}