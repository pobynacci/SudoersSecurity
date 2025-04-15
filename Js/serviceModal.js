document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('service-modal');
    const modalTitle = document.getElementById('service-modal-title');
    const modalImage = document.getElementById('service-modal-image');
    const modalDescription = document.getElementById('service-modal-description');
    const closeButton = document.querySelector('.service-close-modal');
    const serviceCloseModal = document.querySelector('.service-close-modal');
    const serviceModal = document.querySelector('.service-modal');

    serviceCloseModal.addEventListener('click', () => {
        serviceModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    const serviceDetails = {
        'Web3 Pentest': {
        image: 'Images/web3-pentest.gif',
        description: `<p>Our Web3 penetration testing engagements are designed to simulate real-world attacks against decentralized applications and blockchain infrastructure. We focus on identifying exploitable vulnerabilities across:</p>
        <br>
        <hr color='teal';>
        <br>
        <ul>
            <li>Decentralized Applications (dApps): Testing for client-side and backend issues, insecure Web3 integrations, wallet interaction flaws, authentication bypasses, and more.</li>
            <li>Blockchain Infrastructure: Assessing node exposure, misconfigurations, RPC/API weaknesses, and risks in consensus or communication protocols.</li>
        </ul>
        <br>
        <hr color='teal';>
        <br>
        <p>After testing, all findings had been delivered in a detailed report that included risk ratings, proof-of-concept (PoC) examples, recommendations, and sufficient technical detail.</p>`
        },

        'Smart Contract Audit': {
        image: 'Images/Smart-Contract-Audit.gif',
        description: `<p>Our Smart Contract Auditing services are designed to help you secure your blockchain-based applications before they go live. We perform in-depth code reviews and vulnerability assessments tailored to your contract’s logic and platform.</p>
        <br>
        <hr color='teal';>
        <br>
        <ul>
            <p>Our auditing process includes:</p>
            <br>
            <li>Manual Code Review</li>
            <li>Automated Scanning</li>
            <li>Business Logic Validation</li>
            <li>Security Best Practices Check</li>
        </ul>
        <br>
        <hr color='teal';>
        <br>
        <p>After testing, all findings are delivered in a detailed report that includes risk ratings, proof-of-concept (PoC) examples, recommendations, and sufficient technical detail.</p>`
        },

        'Web App Pentest': {
        image: 'Images/web-pentest.gif',
        description: `<p>Our comprehensive Web Application Penetration Testing service identifies vulnerabilities in your web applications before malicious actors can exploit them. We use a combination of automated tools and manual testing to discover:</p>
        <br>
        <hr color='teal';>
        <br>
        <ul>
            <li>OWASP TOP 10 vulnerabilities</li>
            <li>SQL Injection vulnerabilities</li>
            <li>Cross-Site Scripting (XSS) weaknesses</li>
            <li>Authentication flaws</li>
            <li>Authorization bypass issues</li>
            <li>API security problems</li>
            <li>Business logic flaws</li>
        </ul>
        <br>
        <hr color='teal';>
        <br>
        <p>After testing, all findings are delivered in a detailed report that includes risk ratings, proof-of-concept (PoC) examples, recommendations, and sufficient technical detail.</p>`
        },

        'Mobile App Pentest': {
        image: 'Images/Mobile-pentest.gif',
        description: `<p>Our Mobile App Penetration Testing services are designed to identify security vulnerabilities in your mobile applications, ensuring they are secure against potential attacks. We perform comprehensive testing across both iOS and Android platforms, simulating real-world attacks to uncover critical weaknesses.</p>
        <br>
        <hr color='teal';>
        <br>
        <ul>
            <p>Our testing covers the OWASP Mobile Top 10:</p>
            <br>
            <li>Improper Platform Usage</li>
            <li>Insecure Data Storage</li>
            <li>Insecure Communication</li>
            <li>Authorization bypass issues</li>
            <li>Insufficient Cryptography</li>
            <li>Insecure Authorization</li>
            <li>Client Code Quality</li>
            <li>Code Tampering</li>
            <li>Reverse Engineering</li>
            <li>Extraneous Functionality</li>
        </ul>
        <br>
        <hr color='teal';>
        <br>
        <p>After testing, all findings are delivered in a detailed report that includes risk ratings, proof-of-concept (PoC) examples, recommendations, and sufficient technical detail.</p>`
        },

        'Vulnerability Scanning': {
        image: 'Images/Vul-Scanning.gif',
        description: `<p>Our Vulnerability Scanning services provide automated and thorough assessments to identify security weaknesses across your network, systems, and applications. By detecting potential risks early, we help you address vulnerabilities before they can be exploited by attackers.</p>
        <br>
        <hr color='teal';>
        <br>
        <ul>
            <p>Our scanning process includes:</p>
            <br>
            <li>Network Vulnerability Scanning</li>
            <li>Web Application Scanning</li>
            <li>Database Scanning</li>
            <li>System & Endpoint Scanning</li>
        </ul>
        <br>
        <hr color='teal';>
        <br>
        <p>After testing, all findings are delivered in a detailed report that includes risk ratings, proof-of-concept (PoC) examples, recommendations, and sufficient technical detail.</p>`
        },

        'AI/ML Pentest': {
        image: 'Images/AI-pentest.gif',
        description: `<p>Our AI/ML Penetration Testing services focus on identifying security risks in machine learning models, algorithms, and AI-driven systems. With the increasing use of AI and ML in sensitive applications, it's crucial to ensure these systems are resilient against exploitation and adversarial manipulation.</p>
        <br>
        <hr color='teal';>
        <br>
        <ul>
            <p>Our testing process includes:</p>
            <br>
            <li>OWASP Top 10 LLM</li>
            <li>Prompt Injection</li>
            <li>Model Poisoning</li>
            <li>Adversarial Attacks</li>
            <li>Data Leakage & Privacy Risks</li>
            <li>Model Inversion & Reverse Engineering</li>
            <li>Access Control & Authorization</li>
            <li>Robustness Testing</li>
        </ul>
        <br>
        <hr color='teal';>
        <br>
        <p>After testing, all findings are delivered in a detailed report that includes risk ratings, proof-of-concept (PoC) examples, recommendations, and sufficient technical detail.</p>`
        },

        'Network Pentest': {
        image: 'Images/Network-pentest.gif',
        description: `<p>Our Network Penetration Testing services focus on evaluating and strengthening the security of your network infrastructure. We simulate real-world attacks to uncover vulnerabilities that could be exploited by malicious actors, providing you with the insights needed to bolster your network defenses.</p>
        <br>
        <hr color='teal';>
        <br>
        <ul>
            <p>Our testing includes:</p>
            <br>
            <li>External Network Testing</li>
            <li>Internal Network Testing</li>
            <li>Wireless Network Testing</li>
            <li>Firewall & Router Configuration Testing</li>
            <li>Endpoint Security Testing</li>
        </ul>
        <br>
        <hr color='teal';>
        <br>
        <p>After testing, all findings are delivered in a detailed report that includes risk ratings, proof-of-concept (PoC) examples, recommendations, and sufficient technical detail.</p>`
        },

        'Active Directory Pentest': {
        image: 'Images/AD-pentest.gif',
        description: `<p>Our Active Directory (AD) Penetration Testing services are designed to assess the security of your domain environment by simulating real-world attack techniques used by threat actors. We uncover weaknesses that could lead to privilege escalation, lateral movement, or full domain compromise.</p>
        <br>
        <hr color='teal';>
        <br>
        <ul>
            <p>Our testing includes:</p>
            <br>
            <li>AD Enumeration & Reconnaissance</li>
            <li>Kerberoasting & AS-REP Roasting Attacks</li>
            <li>Privilege Escalation Path Discovery</li>
            <li>Group Policy Misconfiguration Analysis</li>
            <li>Password Policy & Credential Exposure Testing</li>
            <li>Unconstrained & Constrained Delegation Abuse</li>
            <li>Abuse of Default/Legacy Protocols (e.g., SMB, LDAP, RDP)</li>
            <li>Detection of Over-Privileged Accounts & Shadow Admins</li>
        </ul>
        <br>
        <hr color='teal';>
        <br>
        <p>After testing, all findings are delivered in a detailed report that includes risk ratings, proof-of-concept (PoC) examples, recommendations, and sufficient technical detail.</p>`
        },

        'Phishing Simulation': {
        image: 'Images/Phising-Simulation.gif',
        description: `<p>Our Phishing Simulation services are designed to evaluate how your employees respond to realistic social engineering attacks. By mimicking the techniques used by real-world threat actors, we help you identify human vulnerabilities and raise security awareness across your organization.</p>
        <br>
        <hr color='teal';>
        <br>
        <ul>
            <p>Our simulation process includes:</p>
            <br>
            <li>Customized Phishing Campaigns</li>
            <li>Spear Phishing & Targeted Attacks</li>
            <li>Performance Metrics & Analytics</li>
        </ul>
        <br>
        <hr color='teal';>
        <br>
        <p>All results are delivered in a comprehensive report that includes campaign performance metrics, risk insights, and tailored recommendations.</p>`
        },

        'Training & Awareness Programs': {
        image: 'Images/Training.gif',
        description: `<p>Our Training and Awareness services are designed to empower your workforce with the knowledge and skills needed to recognize, avoid, and respond to cybersecurity threats. We deliver practical, role-based content that promotes a strong security culture across your organization.</p>
        <br>
        <hr color='teal';>
        <br>
        <ul>
            <p>Our program includes:</p>
            <br>
            <li>Ethical Hacking</li>
            <li>Security Awareness Training</li>
            <li>Role-Based Education</li>
            <li>Interactive Learning Formats</li>
            <li>Gamified Challenges & Simulations</li>
            <li>Compliance-Focused Content</li>
        </ul>
        <br>
        <hr color='teal';>
        <br>
        <p>All programs are delivered with measurable outcomes, certification for all trainees, and recommendations to strengthen your organization’s overall security posture.</p>`
        },

        'Technical Security Consultant': {
        image: 'Images/Technical-assessment.gif',
        description: `<p>Our Technical Security Consultant services provide guidance to help you design secure systems from the ground up and implement new system enhancements. We specialize in integrating security into the development and architecture of new systems, ensuring that your infrastructure is secure, compliant, and resilient from the start, while also addressing evolving threats and business needs.</p>
        <br>
        <p>Collaborating with your team to design secure infrastructures and applications by integrating security best practices from the earliest stages of development. We focus on threat modeling, secure architecture principles, and risk mitigation to strengthen your system's defenses.</p>
        <br>
        <hr color='teal';>
        <br>
        <ul>
            <p>We review the following:</p>
            <br>
            <li>Network Diagrams</li>
            <li>User Stories and Journeys</li>
            <li>System Design and Architectures</li>
        </ul>
        <br>
        <hr color='teal';>
        <br>
        <p>After the security assessment, we provide a comprehensive report outlining the findings and recommendations for applying the necessary security measures.</p>`
        },
        // Same process lang
    };
    
    // Open modal when clicking "Learn More"
    document.querySelectorAll('.service-overlay').forEach(overlay => {
        overlay.addEventListener('click', function() {
        const serviceName = this.closest('.service-card').querySelector('h3').textContent;
        const serviceDetail = serviceDetails[serviceName] || {
            image: this.closest('.service-card').querySelector('.service-image img').src,
            description: '<p>Detailed information about this service coming soon. Contact us for more details.</p>'
        };
        
        modalTitle.textContent = serviceName;
        modalImage.innerHTML = `<img src="${serviceDetail.image}" alt="${serviceName}">`;
        modalDescription.innerHTML = serviceDetail.description;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside the content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        }
    });
});