import { render, screen } from '@testing-library/react';

import { Input } from '../Input';

describe('Input', () => {
  it('should display the value inside the input', () => {
    render(<Input id="input" value="Neo" onChange={() => {}} />);

    expect(screen.getByDisplayValue('Neo')).toBeInTheDocument();
  });

  it('should display the label if given', () => {
    render(<Input id="input" value="Neo" onChange={() => {}} label="Pseudo" />);

    expect(screen.getByLabelText('Pseudo')).toBeInTheDocument();
  });
});
