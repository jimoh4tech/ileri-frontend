import { Alert, AlertIcon } from "@chakra-ui/react";

function AlertComponent({
	message,
	status,
}: {
	message: string;
	status: 'error' | 'success'  | undefined ;
}) {
  return <>
    <Alert status={status}>
      <AlertIcon />
      {message}
  </Alert>
  </>;
}

export default AlertComponent;
