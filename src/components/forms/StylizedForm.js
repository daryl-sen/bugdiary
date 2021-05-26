import "./StylizedForm.scss";

export default function StylizedForm(props) {
  if (!props.formikConfig) {
    return (
      <form action={props.action} method={props.method}>
        {props.children}
      </form>
    );
  }

  const formik = props.formik;
  return <form onSubmit={formik.handleSubmit}>{props.children}</form>;
}
