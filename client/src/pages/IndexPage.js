import { Helmet } from 'react-helmet';
import Landing from 'features/landing/Landing';

const IndexPage = () => (
  <>
    <Helmet>
      <title>Design your own face mask - Where is your mask?</title>
    </Helmet>
    <Landing />
  </>
);

export default IndexPage;
