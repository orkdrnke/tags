import React, { useState } from "react";

import { suggestions, supplier } from "./supplier";
import Home from "./Home";
import Header from "./Header";
import { Box } from "@mui/system";

export enum TypeOfTags {
  GENERAL = "supplierBranch-general",
  CERTIFICATES = "supplierBranch-certificates",
  PORTFOLIO = "supplierBranch-portfolio",
}

export interface ITag {
  name: string;
  id: number;
  type: TypeOfTags;
}

export type SupplierType = {
  [key in "tags-certificates" | "tags-general" | "tags-portfolio"]: ITag[];
} & {
  name: string;
};

export const AppContext = React.createContext<SuggestionsType>(suggestions);

export type SuggestionsType = {
  portfolio: string[];
  certificates: string[];
};

function App() {
  const [supplierData, setSuplierData] = useState<SupplierType>();
  const loadData = () => setSuplierData(supplier as SupplierType);

  return (
    <AppContext.Provider value={suggestions}>
      <Box className="mx-5">
        <Header onClickAction={loadData} />
        <Home supplier={supplierData} />
      </Box>
    </AppContext.Provider>
  );
}

export default App;
