export default function Svg() {
  return (
    <>
      <svg width="500" height="300" viewBox="0 0 850 650">
        <filter id="filter">
          <feOffset in="SourceAlpha" dx="20" dy="20"></feOffset>

          <feGaussianBlur stdDeviation="10" result="DROP"></feGaussianBlur>

          <feFlood flood-color="#000" result="COLOR"></feFlood>

          <feComposite
            in="DROP"
            in2="COLOR"
            operator="in"
            result="SHADOW1"
          ></feComposite>

          <feComponentTransfer in="SHADOW1" result="SHADOW">
            <feFuncA type="table" tableValues="0 0.5"></feFuncA>
          </feComponentTransfer>

          <feMerge>
            <feMergeNode in="SHADOW"></feMergeNode>
            <feMergeNode in="SourceGraphic"></feMergeNode>
          </feMerge>
        </filter>
        <filter id="drop-shadow">
          <feGaussianBlur
            in="SourceAlpha"
            stdDeviation="10"
            result="DROP"
          ></feGaussianBlur>

          <feFlood flood-color="#bbb" result="COLOR"></feFlood>

          <feComposite
            in="COLOR"
            in2="DROP"
            operator="in"
            result="SHADOW"
          ></feComposite>
        </filter>
        <image
          href="/images/photography/IMG_0064.jpeg"
          x="0"
          y="0"
          width="100%"
          height="100%"
          filter="url(#drop-shadow)"
        ></image>
      </svg>

      <svg width="600px" height="400px" viewBox="0 0 600 400">
        <filter id="flooder" x="0" y="0" width="100%" height="100%">
          <feFlood
            flood-color="#EB0066"
            flood-opacity=".9"
            result="FLOOD"
          ></feFlood>

          <feMerge>
            <feMergeNode in="FLOOD" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <text
          dx="100"
          dy="200"
          font-size="150"
          font-weight="bold"
          filter="url(#flooder)"
        >
          Effect!
        </text>
      </svg>
    </>
  );
}
