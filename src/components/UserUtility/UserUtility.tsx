import React from 'react';

interface UserUtilityProps {
  email: string;
}

const UserUtility = ({ email }: UserUtilityProps) => {
  return (
    <div>
      {email && (
        <div>
          Signed in as{' '}
          <span style={{ textDecoration: 'underline' }}>{email}</span>.{' '}
          <span style={{ textDecoration: 'underline' }}>Sign out</span>
        </div>
      )}
    </div>
  );
};

export default UserUtility;
