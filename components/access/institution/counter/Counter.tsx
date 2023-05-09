import { Download } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, InputLabel, MenuItem, Stack, Typography } from "@mui/material";
import FormikDatePicker from "components/common/formik/FormikDatePicker";
import FormikSelect from "components/common/formik/FormkSelect";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import { useGenCounterReportLazyQuery } from "graphql/queries/access.generated"
import { useState } from "react";
import { date, object, string } from "yup";

const schema = object({
  report_id: string().required(),
  institution_id: string().required(),
  reporting_period_start: date().optional().nullable(),
  reporting_period_end: date().optional().nullable()
})

const Counter = ({institutionID}) => {
  const myEarliestReportDate = dayjs(new Date(2014, 6, 1))
  const currentDate = new Date()
  const myLatestReportDate = dayjs(currentDate.setDate(1))
  const [loading, setLoading] = useState(false)
  const [getReport, { data, error }] = useGenCounterReportLazyQuery({
    onCompleted(data){
      const link = document.createElement("a")
      link.download = "jomi_report.csv"
      link.href = "data:text/csv;charset=utf-8," + encodeURI(data.genCounterReport)
      link.target = "_blank"
      link.click()
      setLoading(false)
    }
  })

  return(
    <>
    <Stack spacing={1}>
      <Typography align="center" variant="h6">
        JOMI now offers Counter 5 reports compliant with the Counter Code of Practice. Please fill out the form below.
      </Typography>
      <Typography align="center" variant="body1">
        Note that the reporting period can only range from July 1st, 2014 to the end of the last month (e.g. if it is September, the end date can only be August 31st).
      </Typography>
      <Typography align="center" variant="body1">
        Per COUNTER guidelines, if a report is missing any metrics that means that there is not any usage data for that metric. For example, unique investigations and unique requests may not be reported until we gather enough data.
      </Typography>
      <Typography align="center" variant="body1" fontWeight="bold">
        Any questions, feel free to reach out to dev@jomi.com.
      </Typography>
    </Stack>
    <Formik
        key={institutionID}
        onSubmit={async (values) => {
          setLoading(true)
          await getReport({
            variables: {
              input: {
                report_id: values.report_id,
                institution_id: values.institution_id,
                reporting_period_start: values.reporting_period_start,
                reporting_period_end: values.reporting_period_end
              }
            }
          })
        }}
        validationSchema={schema}
        initialValues={{
          report_id: "PR",
          institution_id: institutionID,
          reporting_period_start: null,
          reporting_period_end: null,
        }}
      >
      <Form>
        <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center">
          <Grid item xs={4}>
            <InputLabel htmlFor="report_ids">Pick a Report</InputLabel>
            <FormikSelect 
                name="report_id"
                id="report_ids"
                size="small"
            >
                <MenuItem value="PR">Platform Master Report</MenuItem>
                <MenuItem value="PR_P1">Platform Usage</MenuItem>
                <MenuItem value="DR">Database Master Report</MenuItem>
                <MenuItem value="DR_D1">Database Search and Item Usage</MenuItem>
                <MenuItem value="DR_D2">Database Access Denied</MenuItem>
                <MenuItem value="IR">Item Master Report</MenuItem>
                <MenuItem value="IR_A1">Journal Article Requests</MenuItem>
                <MenuItem value="IR_M1">Multimedia Requests</MenuItem>
            </FormikSelect>
          </Grid>
          
          <Grid item xs={4} sx={{width:40}}>
            <Stack direction="row" spacing={2} sx={{mt:3}}>
              <FormikDatePicker minDate={myEarliestReportDate} maxDate={myLatestReportDate} name="reporting_period_start" label="Period Start Date" />
              <FormikDatePicker minDate={myEarliestReportDate} maxDate={myLatestReportDate} name="reporting_period_end" label="Period End Date" />
            </Stack>
          </Grid>
          <Grid item xs={4} sx={{mt:3}}>
            <LoadingButton
              variant="contained"
              size="large"
              startIcon={<Download />}
              type="submit"
              loading={loading}
            >
              Download Report
            </LoadingButton>
          </Grid>
          </Grid>
        </Form>
      </Formik>
    </>
  )
}

export default Counter