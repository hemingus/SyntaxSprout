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
                {/* Define an arrowhead marker */}
                <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="10"
                refY="3.5"
                orient="auto"
                markerUnits="strokeWidth"
                >
                <polygon points="0 0, 10 3.5, 0 7" fill={stroke} />
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