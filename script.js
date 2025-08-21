        let sidebarVisible = window.innerWidth > 768;

        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const mainContent = document.getElementById('mainContent');
            
            sidebarVisible = !sidebarVisible;
            
            if (sidebarVisible) {
                sidebar.classList.remove('collapsed');
                mainContent.classList.remove('expanded');
            } else {
                sidebar.classList.add('collapsed');
                mainContent.classList.add('expanded');
            }
        }

        function showPage(pageId) {
            document.querySelectorAll('.page-content').forEach(page => {
                page.classList.remove('active');
            });
            
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            const targetPage = document.getElementById(pageId);
            const targetNavItem = event.target.closest('.nav-item');
            
            targetPage.classList.add('active');
            targetNavItem.classList.add('active');
            
            targetPage.style.animation = 'none';
            setTimeout(() => {
                targetPage.style.animation = 'slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
            }, 10);
        }

        document.getElementById('fileInput').addEventListener('change', function(e) {
            const files = e.target.files;
            if (files.length > 0) {
                const uploadArea = document.querySelector('.upload-area');
                uploadArea.innerHTML = `
                    <div class="upload-icon" style="color: var(--success);">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h4 style="color: var(--success);">${files.length} file(s) selected</h4>
                    <p style="color: var(--text-secondary); margin: 1rem 0 0 0;">Ready to upload</p>
                    <button class="btn btn-primary mt-3">
                        <i class="fas fa-upload"></i>
                        Upload Now
                    </button>
                `;
            }
        });

        document.querySelector('.upload-area').addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('dragover');
        });

        document.querySelector('.upload-area').addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
        });

        document.querySelector('.upload-area').addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.innerHTML = `
                    <div class="upload-icon" style="color: var(--success);">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h4 style="color: var(--success);">${files.length} file(s) dropped</h4>
                    <p style="color: var(--text-secondary); margin: 1rem 0 0 0;">Ready to upload</p>
                    <button class="btn btn-primary mt-3">
                        <i class="fas fa-upload"></i>
                        Upload Now
                    </button>
                `;
            }
        });

        document.addEventListener('DOMContentLoaded', function() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                    }
                });
            });

            document.querySelectorAll('.slide-up, .fade-in').forEach(el => {
                observer.observe(el);
            });

            document.querySelectorAll('form').forEach(form => {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const submitBtn = form.querySelector('button[type="submit"]');
                    if (!submitBtn) return;
                    
                    const originalContent = submitBtn.innerHTML;
                    
                    submitBtn.innerHTML = '<span class="loading-spinner"></span> Processing...';
                    submitBtn.disabled = true;
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
                        submitBtn.style.background = 'var(--success)';
                        
                        setTimeout(() => {
                            submitBtn.innerHTML = originalContent;
                            submitBtn.disabled = false;
                            submitBtn.style.background = '';
                        }, 2500);
                    }, 2000);
                });
            });

            document.querySelectorAll('.form-check-input[type="checkbox"]').forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    const label = document.querySelector(`label[for="${this.id}"]`);
                    if (label) {
                        if (this.checked) {
                            label.style.color = 'var(--primary)';
                        } else {
                            label.style.color = '';
                        }
                    }
                });
            });

            const searchInput = document.querySelector('.search-input');
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                if (searchTerm.length > 2) {
                    console.log('Searching for:', searchTerm);
                }
            });

            setInterval(() => {
                const badges = document.querySelectorAll('.notification-badge');
                badges.forEach(badge => {
                    badge.style.animation = 'none';
                    setTimeout(() => {
                        badge.style.animation = 'pulse 2s infinite';
                    }, 10);
                });
            }, 5000);
        });

        function handleResize() {
            if (window.innerWidth <= 768) {
                sidebarVisible = false;
                document.getElementById('sidebar').classList.add('collapsed');
                document.getElementById('mainContent').classList.add('expanded');
            } else if (!sidebarVisible) {
                sidebarVisible = true;
                document.getElementById('sidebar').classList.remove('collapsed');
                document.getElementById('mainContent').classList.remove('expanded');
            }
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        document.addEventListener('click', function(e) {
            if (e.target.closest('.widget-btn')) {
                const btn = e.target.closest('.widget-btn');
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    btn.style.transform = '';
                }, 150);
            }
        });

        document.querySelectorAll('.stat-card, .widget, .profile-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        });
