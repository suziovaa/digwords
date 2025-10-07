import TermCard from "../TermCard";

export default function TermCardExample() {
  return (
    <div className="p-4 max-w-md">
      <TermCard
        id="1"
        term="Корпусная лингвистика"
        section="Методы исследования"
        definition="Область лингвистики, занимающаяся созданием и анализом корпусов текстов — больших структурированных собраний текстов в электронной форме."
        englishEquivalent="Corpus Linguistics"
      />
    </div>
  );
}
