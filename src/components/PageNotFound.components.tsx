import { Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";


function PageNotFound() {
  return (<>Error 404: Page Not Found. Click <Link color={'teal'} as={RouterLink} to={'/'}>here</Link> to continue shopping</>)
}

export default PageNotFound;