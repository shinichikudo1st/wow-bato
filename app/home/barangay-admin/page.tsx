import { use } from "react";

const BarangayAdminPage = ({
  params,
}: {
  params: Promise<{ barangayID: string }>;
}) => {
  const barangayID = use(params).barangayID;

  return <div>BarangayAdminPage</div>;
};

export default BarangayAdminPage;
