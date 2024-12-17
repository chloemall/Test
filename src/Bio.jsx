import React from 'react';
import { Card, Row, Col, Divider, List } from 'antd';
import {
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
  AppstoreAddOutlined,
  DesktopOutlined,
  LinkOutlined,
  GlobalOutlined,
} from '@ant-design/icons';

const App = () => {
  const bio = (
    <p>
      Jimmy Kivai Mutinda is a passionate Full-Stack Developer with over 4 years of experience.
      Founder of <a href="https://curious-speculoos-448767.netlify.app/" target="_blank" rel="noopener noreferrer">Nobe</a> E-Learning and Software Solution Company, specializing in software
      development, IT consultation, and various IT services. The company also offers web
      development, mobile application development, cloud solutions, and cybersecurity services.
    </p>
  );

  const skills = [
    'Building modern web applications using React.js.',
    'Developing mobile applications with React Native for iOS and Android platforms.',
    'Creating custom UI components and handling complex state management with Redux and Context API.',
    'Implementing interactive graphics and animations using HTML5 Canvas.',
    'Proficient in integrating RESTful APIs and GraphQL services with React apps.',
    'Skilled in debugging and performance optimization for React and React Native projects.',
    'Strong knowledge of hooks, lifecycle methods, and functional components in React.',
    'Experienced in creating custom charts and data visualizations with Canvas and libraries like Chart.js.',
  ];

  const projects = [
   
    {
      name: 'Nobe Company Website',
      link: 'https://curious-speculoos-448767.netlify.app/',
    },
    {
      name: 'Nairobi Children Lung Health Center',
      link: 'https://nairobichildrenslunghealthcenter.co.ke/',
    },
    {
      name: 'Tharaka A.I.C Bible College',
      link: 'https://amazing-kelpie-31a5c1.netlify.app/',
    },
    {
      name: 'Yafreeka Social Media Mobile app',
      link: 'https://play.google.com/store/apps/details?id=com.yafreeka.akcreatives',
    },
  ];

  const services = [
    {
      title: 'Software Development',
      icon: <AppstoreAddOutlined style={{ fontSize: '32px', color: '#1890ff' }} />,
      description: 'Custom software solutions tailored to business needs.',
    },
    {
      title: 'IT Consultation',
      icon: <DesktopOutlined style={{ fontSize: '32px', color: '#1890ff' }} />,
      description: 'Expert advice for IT infrastructure and system optimization.',
    },
    {
      title: 'Web & Mobile Apps',
      icon: <DesktopOutlined style={{ fontSize: '32px', color: '#1890ff' }} />,
      description: 'Responsive websites and cross-platform mobile applications.',
    },
    {
      title: 'Cloud Solutions',
      icon: <DesktopOutlined style={{ fontSize: '32px', color: '#1890ff' }} />,
      description: 'Cloud storage, hosting, and deployment services.',
    },
    {
      title: 'Cybersecurity',
      icon: <DesktopOutlined style={{ fontSize: '32px', color: '#1890ff' }} />,
      description: 'Protect your business with top-notch security solutions.',
    },
  ];

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
      <Row gutter={[16, 16]}>
        {/* Profile Card */}
        <Col xs={24} md={8}>
          <Card
            title="Jimmy Kivai Mutinda"
            hoverable
            style={{ width: '100%' }}
            cover={
              <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                <img
                  alt="developer"
                  src="https://firebasestorage.googleapis.com/v0/b/music-c6bf3.appspot.com/o/WhatsApp%20Image%202024-11-25%20at%2010.18.04%20PM.jpeg?alt=media&token=5a83343d-1090-47e1-99ac-653f39113013"
                  style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            }
          >
            {bio}
            <Divider>Contact Information</Divider>
            <p><MailOutlined /> Email: chloemallc@gmail.com</p>
            <p><GithubOutlined /> GitHub: <a href="https://github.com/chloemall/" target="_blank" rel="noopener noreferrer">github.com/jimmykivai</a></p>
            <p><LinkedinOutlined /> LinkedIn: <a href="https://www.linkedin.com/in/jimmy-mutinda-a4789a282/" target="_blank" rel="noopener noreferrer">linkedin.com/in/jimmykivai</a></p>
            <p><DesktopOutlined /> Phone: +254-115973519</p>
            <p><GlobalOutlined /> Company Website: <a href="https://curious-speculoos-448767.netlify.app/" target="_blank" rel="noopener noreferrer">www.nobe.co.ke</a></p>
          </Card>
        </Col>

        {/* Skills, Projects, and Services Section */}
        <Col xs={24} md={16}>
          <Row gutter={[16, 16]}>
            {/* Skills Section */}
            <Col span={24}>
              <Card hoverable>
                <h3>Skills</h3>
                <List
                  dataSource={skills}
                  renderItem={(item) => (
                    <List.Item>
                      <DesktopOutlined style={{ color: '#1890ff', marginRight: '10px' }} />
                      {item}
                    </List.Item>
                  )}
                />
              </Card>
            </Col>

            {/* Projects Section */}
            <Col span={24}>
              <Card hoverable>
                <h3>Projects</h3>
                <List
                  dataSource={projects}
                  renderItem={({ name, link, description }) => (
                    <List.Item>
                      <LinkOutlined style={{ color: '#1890ff', marginRight: '10px' }} />
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        {name}
                      </a>{' '}
                      - {description}
                    </List.Item>
                  )}
                />
              </Card>
            </Col>

            {/* Services Section */}
            {services.map((service, index) => (
              <Col span={12} key={index}>
                <Card hoverable>
                  {service.icon}
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default App;
