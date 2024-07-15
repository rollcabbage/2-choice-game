type ItemProps = {
  question_text: string;
  question_options: {
    A: string;
    B: string;
  };
};

export const Item = ({ question_text, question_options }: ItemProps) => {
  return (
    <div className="flex-col h-screen items-center">
      <div className="bg-yellow-600 text-center text-7xl sm:px-6 lg:px-8 lg:py-16">
        {question_text}
      </div>
      <div className="columns-2 text-center sm:px-6 lg:px-8 lg:py-16">
        <div className="text-4xl">{question_options.A}</div>
        <div className="text-4xl">{question_options.B}</div>
      </div>
    </div>
  );
};
