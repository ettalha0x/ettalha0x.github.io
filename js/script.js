document.addEventListener("DOMContentLoaded", () => {
    fetch('../data/resume.json')
        .then(response => response.json())
        .then(resumeData => {
            // Load Header
            document.getElementById('name').textContent = resumeData.header.name;
            document.getElementById('phone').textContent = `Phone: ${resumeData.header.phone}`;
            document.getElementById('email').textContent = `Email: ${resumeData.header.email}`;
            document.getElementById('linkedin').innerHTML = `LinkedIn: <a href="${resumeData.header.linkedin}">${resumeData.header.linkedin}</a>`;
            document.getElementById('address').textContent = `Address: ${resumeData.header.address}`;

            // Load About Me
            document.getElementById('about-description').textContent = resumeData.about_me.description;

            // Load Education
            const educationList = document.getElementById('education-list');
            resumeData.education_and_training.forEach(edu => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <h3>${edu.institution}</h3>
                    <p>${edu.dates} | ${edu.location}</p>
                    <p>Field of study: ${edu.field_of_study}</p>
                `;
                educationList.appendChild(listItem);
            });

            // Load Skills
            const digitalSkills = document.getElementById('digital-skills');
            resumeData.digital_skills.forEach(skill => {
                const skillDiv = document.createElement('div');
                skillDiv.innerHTML = `
                    <h4>${skill.category} (${skill.level ? skill.level : 'N/A'})</h4>
                    <p>${skill.skills.join(', ')}</p>
                `;
                digitalSkills.appendChild(skillDiv);
            });

            // Load Projects
            const projectsList = document.getElementById('projects-list');
            resumeData.projects.forEach(project => {
                const projectItem = document.createElement('li');
                projectItem.innerHTML = `
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    ${project.link ? `<p>Link: <a href="${project.link}" target="_blank">${project.link}</a></p>` : ''}
                `;
                projectsList.appendChild(projectItem);
            });
        })
        .catch(error => {
            console.error('Error loading the resume data:', error);
        });
});
