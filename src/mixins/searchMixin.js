export default {
    computed: {
        filteredProjects: function() {
            return this.projects.filter(project => {
                return project.title.match(this.search);
            });
        }
    }
};
