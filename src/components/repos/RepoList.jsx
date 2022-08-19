import React from 'react';

const RepoList = ({ repos }) => {
  return (
    <div className="reounded-lg shadow-lg card bg-base-100 ">
      <div className="card-body">
        <h2 className="text-3xl my-4 font-bold card-title">
          Latest Repositories
              </h2>
              {repos.map((repo) => (
                  <p>{repo.name}</p>
              ))}
      </div>
    </div>
  );
};

export default RepoList;
