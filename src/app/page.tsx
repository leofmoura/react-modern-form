import { CardForm } from '@/components/custom/card-form';
import Form from '@/components/custom/form';

export default function Home() {
  return (
    <CardForm
      title='Create user'
      description='Join our community and make the difference!'
    >
      <Form />
    </CardForm>
  );
}
