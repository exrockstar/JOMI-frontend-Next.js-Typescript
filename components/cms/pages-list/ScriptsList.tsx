import { Delete } from "@mui/icons-material";
import { Button, IconButton, Stack, Typography } from "@mui/material"
import FormikTextField from "components/common/formik/FormikTextFIeld";
import { useField } from "formik";


export const ScriptsList = ({fieldName}) => {
  const [field, meta, helpers] = useField(`${fieldName}`);
  const scripts = field.value;
  const remove = (value: string) => {
    const updated = field.value?.filter((script) => script !== value);
    helpers.setValue(updated);
  }
    return(
        <>
            {scripts && scripts.length > 0 ?  (
                scripts.map((script, index) => {
                  return(
                    <Stack direction="row" key={index}>
                        <FormikTextField
                          name={`${fieldName}.${index}`}
                          label="Scripts"
                          placeholder='<script src="asdfg"></script>'
                          size="small"
                          fullWidth
                          margin="normal"
                          multiline
                        />
                        <IconButton color="error" onClick={() => remove(script)}>
                          <Delete />
                        </IconButton>
                    </Stack>
                  )
                }))
                 : (<Typography>No scripts found</Typography>)
              }
              <Button color="success" onClick={() => {
                helpers.setValue([...scripts, '']);
              }}>
                Add a script
              </Button>  
        </>
    )
}