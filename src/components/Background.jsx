import background from "./../assets/bg-image.jpg";
import "./Background.css";

export default function Background() {
  return (
    <section>
      <div className="Background">
        <img
          src={background}
          alt="Background Image"
          width="100%"
          height="400px"
        />
      </div>
    </section>
  );
}
