import { InstitutionsListQuery } from "graphql/cms-queries/institutions-list.generated";

export type Institutions = Unpacked<InstitutionsListQuery['institutions']>
