import {
  OzefField,
  OzefPreviewFields,
  ozefPreviewClassName,
  ozefPreviewDefaults,
} from "./ozef-preview-fields";

export function OzefGalleryPreview() {
  return (
    <form
      className={ozefPreviewClassName}
      noValidate
      autoComplete="off"
      aria-label="Ozef example form"
    >
      <OzefPreviewFields
        firstName={
          <OzefField
            label="First name"
            inputProps={{
              type: "text",
              name: "firstName",
              defaultValue: ozefPreviewDefaults.firstName,
            }}
          />
        }
        lastName={
          <OzefField
            label="Last name"
            inputProps={{
              type: "text",
              name: "lastName",
              defaultValue: ozefPreviewDefaults.lastName,
            }}
          />
        }
        email={
          <OzefField
            label="Email"
            inputProps={{
              type: "email",
              name: "email",
              defaultValue: ozefPreviewDefaults.email,
            }}
          />
        }
      />
    </form>
  );
}
