import "./App.css";
import FormComponent from "./FormComponent";

function Root() {
  return (
    <div className="RootView">
      <section className="RootWrapper">
        <p
          id="title"
          className="fs-4 text-white pb-3 col-xxl-6 col-xl-6 col-lg-7 col-md-9 col-sm-10 col-11"
        >
          Czy już widzisz tutaj swój nowy dom? Skontaktuj się z nami <br />
          <strong id="titleBold">i porozmawiajmy o ofercie na działki!</strong>
        </p>
        <FormComponent />
      </section>
    </div>
  );
}

export default Root;
