interface CurvedArrowProps {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    controlX: number;
    controlY: number;
    stroke: string;
  }

const CurvedArrow = ({startX, startY, endX, endY, controlX, controlY, stroke}: CurvedArrowProps) => {
    const pathData = `M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`;
    return (
        <>
            <defs>
                <marker
                id="arrowhead"
                markerWidth="6"
                markerHeight="6"
                refX="5"
                refY="3"
                orient="auto"
                markerUnits="strokeWidth"
                >
                <path d="M 0 0 L 6 3 L 0 6 Z" fill={stroke} />
                </marker>
            </defs>
            <path
                d={pathData}
                stroke={stroke}
                fill="transparent"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"  // Attach the arrowhead to the end of the path
            />
        </>
    );
};

export default CurvedArrow;