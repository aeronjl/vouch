import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

// GraphQL queries and mutations
const GET_PAPERS = gql`
  query GetPapers {
    papers {
      id
      title
      url
      votes
      comments {
        id
        content
      }
    }
  }
`;

const ADD_PAPER = gql`
  mutation AddPaper($title: String!, $url: String!) {
    addPaper(title: $title, url: $url) {
      id
      title
      url
    }
  }
`;

const VOTE_PAPER = gql`
  mutation VotePaper($id: ID!) {
    votePaper(id: $id) {
      id
      votes
    }
  }
`;

function App() {
  return (
    <div className="App">
      <h1>Academic Paper Discussion</h1>
      <AddPaperForm />
      <PaperList />
    </div>
  );
}

function AddPaperForm() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [addPaper] = useMutation(ADD_PAPER, {
    refetchQueries: [{ query: GET_PAPERS }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addPaper({ variables: { title, url } });
    setTitle('');
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Paper Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="url"
        placeholder="Paper URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button type="submit">Add Paper</button>
    </form>
  );
}

function PaperList() {
  const { loading, error, data } = useQuery(GET_PAPERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data.papers.map((paper) => (
        <PaperItem key={paper.id} paper={paper} />
      ))}
    </div>
  );
}

function PaperItem({ paper }) {
  const [votePaper] = useMutation(VOTE_PAPER);

  const handleVote = () => {
    votePaper({ variables: { id: paper.id } });
  };

  return (
    <div>
      <h2>{paper.title}</h2>
      <a href={paper.url} target="_blank" rel="noopener noreferrer">
        View Paper
      </a>
      <p>Votes: {paper.votes}</p>
      <button onClick={handleVote}>Vote</button>
      <h3>Comments:</h3>
      <ul>
        {paper.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;