   query: gql`
      query Articles {
        articles {
          _id
          title
          status
          comment_status
          comment_count
          authors
          visibility
          previousWistiaIDS
          categories
          tags
          content {
            toc {
              _id
              number
              text
              id
              subheaders {
                number
                text
                id
              }
            }
            otoc {
              _id
              number
              text
              id
              subheaders {
                number
                text
                id
              }
            }
            transcription
            article
            abstract
            outline
            citations
          }
          category_priority_sort
          all_priority_sort
          created
          updated
          assets {
            _id
            url
            width
            height
            fileSize
            contentType
            type
          }
          chapters {
            number
            title
            time
            subchapter {
              number
              parent
              title
              time
            }
          }
          hospital {
            name
          }
          preprint_date
          edit_last
          published
          production_id
          display_last
          publication_id
          slug
          image {
            geometry {
              width
              height
            }
            format
            _id
            filename
            length
          }
          vid_length
          vid_length_raw
          wistia_id
          authors_attr_html
          descriptionSEO
          has_complete_abstract
          DOIStatus
          wistia {
            internal_id
            name
            duration
            progress
            status
            uploaded
            updated
            description
            thumbnail {
              url
              width
              height
            }
            project {
              id
              name
              hashed_id
            }
            last_checked
          }
          stats {
            averagePercentWatched
            pageLoads
            percentOfVisitorsClickingPlay
            plays
            visitors
            last_checked
          }
        }
      }
    `