import BattleInterface from '@/components/battle-interface';
import { characters, quizQuestions, Question } from '@/lib/data';
import { notFound } from 'next/navigation';

type BattlePageProps = {
  params: {
    character: string;
  };
  searchParams: {
    topics?: string;
    redirect?: string;
  };
};

export default function BattlePage({ params, searchParams }: BattlePageProps) {
  const character = characters.find((c) => c.id === params.character);

  if (!character) {
    notFound();
  }

  // Default to all topics if none are specified in the URL
  const topics = searchParams.topics ? searchParams.topics.split(',') : ['HTML', 'CSS', 'JavaScript'];
  
  const selectedQuestions = quizQuestions.filter(q => {
    const questionTopic = q.topic.toLowerCase();
    const selectedTopics = topics.map(t => t.toLowerCase());
    return selectedTopics.includes(questionTopic);
  });

  return <BattleInterface character={character} questions={selectedQuestions} searchParams={searchParams} />;
}
