import React, { useState } from "react";
import AuthDialog from "./components/AuthDialog";
import SignUpForm from "./components/AuthDialog/SignUpForm";

const App = () => {
  const [isShowAuthDialog, setIsShowAuthDialog] = useState(true);

  return (
    <div>
      <AuthDialog
        isOpen={isShowAuthDialog}
        onClose={() => setIsShowAuthDialog(false)}
      />
    </div>
  );
};

export default App;
