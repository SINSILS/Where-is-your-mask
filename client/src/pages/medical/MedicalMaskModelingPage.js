import { Helmet } from 'react-helmet';
import Modeling from 'features/modeling/Modeling';

const MedicalMaskModelingPage = () => (
  <>
    <Helmet>
      <title>Design your own medical mask - Where is your mask?</title>
    </Helmet>
    <Modeling />
  </>
);

export default MedicalMaskModelingPage;
