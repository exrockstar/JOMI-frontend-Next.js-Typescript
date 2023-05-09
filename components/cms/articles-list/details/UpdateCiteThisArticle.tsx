
import { Button } from '@mui/material'
import { generateHowToCiteStr } from 'components/article/generateHowToCite'
import dayjs from 'dayjs'
import { useField, useFormikContext } from 'formik'
import { Article } from 'graphql/types'
import React, { useMemo } from 'react'
import TextEditor from 'ui/TextEditor'

type Props = {
  authors: {
    display_name?: string;
    name?: {
      last?: string;
      first?: string;
      middle?: string;
    };
  }[],
  preprint_date: Article["preprint_date"]
  published: Article["published"],
  publication_id: Article["publication_id"]
}



const UpdateCiteThisArticle = (props: Props) => {
  const key = 'content.cite_this_article';
  const [title] = useField('title')
  const [field] = useField(key)
  const { setFieldValue } = useFormikContext()

  const handleClick = () => {
    const generated = generateHowToCiteStr({
      ...props,
      title: title.value
    })
    setFieldValue(key, generated)
  }

  return (
    <div>
      <TextEditor value={field.value} setField={(val) => {
        setFieldValue('content.cite_this_article', val)
      }} />
      <Button color="secondary" variant="outlined" onClick={handleClick} sx={{ mt: 2 }}> Generate How to Cite </Button>
    </div>
  )
}

export default UpdateCiteThisArticle