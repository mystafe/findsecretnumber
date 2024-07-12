import React from 'react';
import styled from 'styled-components';

const ToggleContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Flag = styled.img`
  width: 30px;
  height: 20px;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.2);
  }
`;

const LanguageToggle = ({ language, setLanguage }) => {
  return (
    <ToggleContainer>
      <Flag src="https://www.countryflags.com/wp-content/uploads/turkey-flag-png-large.png" alt="Türkçe" onClick={() => setLanguage('tr')} />
      <Flag src="https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png" alt="English" onClick={() => setLanguage('en')} />
      <Flag src="https://www.countryflags.com/wp-content/uploads/germany-flag-png-large.png" alt="Deutsch" onClick={() => setLanguage('de')} />
      <Flag src="https://www.countryflags.com/wp-content/uploads/spain-flag-png-large.png" alt="Español" onClick={() => setLanguage('es')} />
      <Flag src="https://www.countryflags.com/wp-content/uploads/russia-flag-png-large.png" alt="Русский" onClick={() => setLanguage('ru')} />
      <Flag src="https://www.countryflags.com/wp-content/uploads/united-arab-emirates-flag-png-large.png" alt="العربية" onClick={() => setLanguage('ar')} />
      <Flag src="https://www.countryflags.com/wp-content/uploads/china-flag-png-large.png" alt="中文" onClick={() => setLanguage('zh')} />
      <Flag src="https://www.countryflags.com/wp-content/uploads/indonesia-flag-png-large.png" alt="Bahasa Indonesia" onClick={() => setLanguage('id')} />
    </ToggleContainer>
  );
};

export default LanguageToggle;