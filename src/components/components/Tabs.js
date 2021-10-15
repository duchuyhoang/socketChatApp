import React, { useEffect, useState } from 'react';
import { Children } from 'react';
import { Link } from 'react-router-dom';

const TabPain = (props) => {
  return props.children;
};

function Tabs(props) {
  const { children } = props;
  const [dataTabs, setDataTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    let data = [];
    Children.forEach(children, (element) => {
      if (!React.isValidElement(element)) return;
      const {
        props: { title, children },
      } = element;

      data.push({ title, children });
    });

    setDataTabs(data);
  }, [children]);

  return (
    <div className='tabs'>
      <ul className='tabs__list'>
        {dataTabs.map((item, index) => (
          <li key={index} className={`${index === activeTab ? 'active' : ''}`}>
            <Link
              to='#'
              onClick={() => {
                setActiveTab(index);
              }}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>

      <div className='tabs__content'>
        {dataTabs[activeTab] && dataTabs[activeTab].children}
      </div>
    </div>
  );
}

Tabs.TabPain = TabPain;

export default Tabs;
