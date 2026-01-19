export function SubscriptionPlansManagementPage(data) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subscription Plans - Admin Dashboard</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8fafc; }
        .header { background: white; border-bottom: 1px solid #e2e8f0; padding: 1rem 2rem; }
        .header h1 { color: #1e293b; font-size: 1.5rem; }
        .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .section { background: white; border-radius: 8px; border: 1px solid #e2e8f0; padding: 1.5rem; margin-bottom: 2rem; }
        .section h2 { color: #1e293b; margin-bottom: 1rem; }
        .btn { background: #3b82f6; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; font-size: 0.875rem; margin-right: 0.5rem; }
        .btn:hover { background: #2563eb; }
        .btn-danger { background: #dc2626; }
        .btn-danger:hover { background: #b91c1c; }
        .btn-success { background: #10b981; }
        .btn-success:hover { background: #059669; }
        .table { width: 100%; border-collapse: collapse; }
        .table th, .table td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #f1f5f9; }
        .table th { background: #f8fafc; color: #64748b; font-weight: 600; }
        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; color: #64748b; font-size: 0.875rem; margin-bottom: 0.5rem; }
        .form-group input, .form-group textarea, .form-group select { width: 100%; padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 0.875rem; }
        .modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); z-index: 1000; }
        .modal.active { display: flex; align-items: center; justify-content: center; }
        .modal-content { background: white; border-radius: 8px; padding: 2rem; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto; }
        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .modal-header h3 { color: #1e293b; font-size: 1.25rem; }
        .modal-close { background: none; border: none; color: #64748b; cursor: pointer; font-size: 1.5rem; }
        .tag { display: inline-block; background: #e0e7ff; color: #4f46e5; padding: 0.25rem 0.5rem; border-radius: 6px; font-size: 0.75rem; margin-right: 0.25rem; margin-bottom: 0.25rem; }
        .tag-remove { margin-left: 0.25rem; cursor: pointer; color: #ef4444; }
        .feature-input { display: flex; gap: 0.5rem; margin-bottom: 0.5rem; }
    </style>
</head>
<body>
    <div class="header">
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <h1>Subscription Plans Management</h1>
            <nav style="display: flex; gap: 1rem;">
                <a href="/admin/dashboard" style="color: #64748b; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">Dashboard</a>
                <a href="/admin/users" style="color: #64748b; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">Users</a>
                <a href="/admin/providers" style="color: #64748b; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">AI Providers</a>
                <a href="/admin/plans" style="color: #1e293b; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px; background: #f1f5f9;">Subscription Plans</a>
                <a href="/admin/packages" style="color: #64748b; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">Credit Packages</a>
                <a href="/admin" style="color: #dc2626; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">Logout</a>
            </nav>
        </div>
    </div>
    
    <div class="container">
        <div class="section">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h2>Subscription Plans</h2>
                <button class="btn" onclick="openAddModal()">Add Plan</button>
            </div>
            
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price (IDR)</th>
                        <th>Credits</th>
                        <th>Users</th>
                        <th>Features</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="plansTableBody">
                    ${(data.plans || []).map(plan => `
                        <tr>
                            <td>${plan.id}</td>
                            <td>${plan.name}</td>
                            <td>${plan.price.toLocaleString('id-ID')}</td>
                            <td>${plan.credits.toLocaleString('id-ID')}</td>
                            <td>${plan.users}</td>
                            <td>
                                ${(plan.features || []).slice(0, 3).map(f => `<span class="tag">${f}</span>`).join('')}
                                ${(plan.features || []).length > 3 ? '...' : ''}
                            </td>
                            <td>
                                <button class="btn" onclick="editPlan('${plan.id}')">Edit</button>
                                <button class="btn btn-danger" onclick="deletePlan('${plan.id}')">Delete</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    </div>
    
    <!-- Add Plan Modal -->
    <div id="addPlanModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Add Subscription Plan</h3>
                <button class="modal-close" onclick="closeAddModal()">&times;</button>
            </div>
            <form id="addPlanForm" onsubmit="addPlan(event)">
                <div class="form-group">
                    <label for="planId">Plan ID</label>
                    <input type="text" id="planId" name="id" required placeholder="e.g. pro">
                </div>
                <div class="form-group">
                    <label for="planName">Plan Name</label>
                    <input type="text" id="planName" name="name" required placeholder="e.g. Pro Plan">
                </div>
                <div class="form-group">
                    <label for="planPrice">Price (IDR)</label>
                    <input type="number" id="planPrice" name="price" required min="0" placeholder="e.g. 99000">
                </div>
                <div class="form-group">
                    <label for="planCredits">Monthly Credits</label>
                    <input type="number" id="planCredits" name="credits" required min="0" placeholder="e.g. 50000">
                </div>
                <div class="form-group">
                    <label for="planUsers">Max Users</label>
                    <input type="number" id="planUsers" name="users" required min="1" placeholder="e.g. 5">
                </div>
                <div class="form-group">
                    <label>Features</label>
                    <div id="addFeaturesContainer">
                        <div class="feature-input">
                            <input type="text" class="feature-input" placeholder="Enter feature" style="flex: 1;">
                            <button type="button" class="btn btn-danger" onclick="this.parentElement.remove()">×</button>
                        </div>
                    </div>
                    <button type="button" class="btn" onclick="addFeatureInput('add')">Add Feature</button>
                </div>
                <div class="form-group">
                    <label>Available Models</label>
                    <div id="addModelsContainer">
                        <div class="feature-input">
                            <input type="text" class="model-input" placeholder="Enter model ID" style="flex: 1;">
                            <button type="button" class="btn btn-danger" onclick="this.parentElement.remove()">×</button>
                        </div>
                    </div>
                    <button type="button" class="btn" onclick="addModelInput('add')">Add Model</button>
                </div>
                <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 1rem;">
                    <button type="button" class="btn" onclick="closeAddModal()">Cancel</button>
                    <button type="submit" class="btn btn-success">Add Plan</button>
                </div>
            </form>
        </div>
    </div>
    
    <!-- Edit Plan Modal -->
    <div id="editPlanModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Edit Subscription Plan</h3>
                <button class="modal-close" onclick="closeEditModal()">&times;</button>
            </div>
            <form id="editPlanForm" onsubmit="updatePlan(event)">
                <input type="hidden" id="editPlanId">
                <div class="form-group">
                    <label for="editPlanName">Plan Name</label>
                    <input type="text" id="editPlanName" name="name" required>
                </div>
                <div class="form-group">
                    <label for="editPlanPrice">Price (IDR)</label>
                    <input type="number" id="editPlanPrice" name="price" required min="0">
                </div>
                <div class="form-group">
                    <label for="editPlanCredits">Monthly Credits</label>
                    <input type="number" id="editPlanCredits" name="credits" required min="0">
                </div>
                <div class="form-group">
                    <label for="editPlanUsers">Max Users</label>
                    <input type="number" id="editPlanUsers" name="users" required min="1">
                </div>
                <div class="form-group">
                    <label>Features</label>
                    <div id="editFeaturesContainer"></div>
                    <button type="button" class="btn" onclick="addFeatureInput('edit')">Add Feature</button>
                </div>
                <div class="form-group">
                    <label>Available Models</label>
                    <div id="editModelsContainer"></div>
                    <button type="button" class="btn" onclick="addModelInput('edit')">Add Model</button>
                </div>
                <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 1rem;">
                    <button type="button" class="btn" onclick="closeEditModal()">Cancel</button>
                    <button type="submit" class="btn btn-success">Update Plan</button>
                </div>
            </form>
        </div>
    </div>
    
    <script>
        // Load plans data
        let plansData = ${JSON.stringify(data.plans || [])};
        
        function openAddModal() {
            document.getElementById('addPlanModal').classList.add('active');
            document.getElementById('addPlanForm').reset();
            document.getElementById('addFeaturesContainer').innerHTML = \`
                <div class="feature-input">
                    <input type="text" class="feature-input" placeholder="Enter feature" style="flex: 1;">
                    <button type="button" class="btn btn-danger" onclick="this.parentElement.remove()">×</button>
                </div>
            \`;
            document.getElementById('addModelsContainer').innerHTML = \`
                <div class="feature-input">
                    <input type="text" class="model-input" placeholder="Enter model ID" style="flex: 1;">
                    <button type="button" class="btn btn-danger" onclick="this.parentElement.remove()">×</button>
                </div>
            \`;
        }
        
        function closeAddModal() {
            document.getElementById('addPlanModal').classList.remove('active');
        }
        
        function openEditModal() {
            document.getElementById('editPlanModal').classList.add('active');
        }
        
        function closeEditModal() {
            document.getElementById('editPlanModal').classList.remove('active');
        }
        
        function addFeatureInput(formType) {
            const container = document.getElementById(formType === 'add' ? 'addFeaturesContainer' : 'editFeaturesContainer');
            const inputDiv = document.createElement('div');
            inputDiv.className = 'feature-input';
            inputDiv.innerHTML = \`
                <input type="text" class="feature-input" placeholder="Enter feature" style="flex: 1;">
                <button type="button" class="btn btn-danger" onclick="this.parentElement.remove()">×</button>
            \`;
            container.appendChild(inputDiv);
        }
        
        function addModelInput(formType) {
            const container = document.getElementById(formType === 'add' ? 'addModelsContainer' : 'editModelsContainer');
            const inputDiv = document.createElement('div');
            inputDiv.className = 'feature-input';
            inputDiv.innerHTML = \`
                <input type="text" class="model-input" placeholder="Enter model ID" style="flex: 1;">
                <button type="button" class="btn btn-danger" onclick="this.parentElement.remove()">×</button>
            \`;
            container.appendChild(inputDiv);
        }
        
        function editPlan(planId) {
            const plan = plansData.find(p => p.id === planId);
            if (!plan) return;
            
            document.getElementById('editPlanId').value = plan.id;
            document.getElementById('editPlanName').value = plan.name;
            document.getElementById('editPlanPrice').value = plan.price;
            document.getElementById('editPlanCredits').value = plan.credits;
            document.getElementById('editPlanUsers').value = plan.users;
            
            // Load features
            const featuresContainer = document.getElementById('editFeaturesContainer');
            featuresContainer.innerHTML = (plan.features || []).map(f => \`
                <div class="feature-input">
                    <input type="text" class="feature-input" value="\${f}" style="flex: 1;">
                    <button type="button" class="btn btn-danger" onclick="this.parentElement.remove()">×</button>
                </div>
            \`).join('');
            
            // Load available models
            const modelsContainer = document.getElementById('editModelsContainer');
            modelsContainer.innerHTML = (plan.available_models || []).map(m => \`
                <div class="feature-input">
                    <input type="text" class="model-input" value="\${m}" style="flex: 1;">
                    <button type="button" class="btn btn-danger" onclick="this.parentElement.remove()">×</button>
                </div>
            \`).join('');
            
            openEditModal();
        }
        
        async function addPlan(event) {
            event.preventDefault();
            
            const formData = new FormData(event.target);
            const features = Array.from(document.querySelectorAll('#addFeaturesContainer .feature-input'))
                .map(input => input.querySelector('.feature-input').value.trim())
                .filter(f => f);
            const availableModels = Array.from(document.querySelectorAll('#addModelsContainer .model-input'))
                .map(input => input.value.trim())
                .filter(m => m);
            
            const plan = {
                id: formData.get('id'),
                name: formData.get('name'),
                price: parseInt(formData.get('price')),
                credits: parseInt(formData.get('credits')),
                users: parseInt(formData.get('users')),
                features: features,
                available_models: availableModels
            };
            
            try {
                const response = await fetch('/api/admin/plans', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(plan)
                });
                
                const data = await response.json();
                if (data.ok) {
                    alert('Plan added successfully');
                    closeAddModal();
                    location.reload();
                } else {
                    alert('Error: ' + (data.err || 'Failed to add plan'));
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error adding plan');
            }
        }
        
        async function updatePlan(event) {
            event.preventDefault();
            
            const planId = document.getElementById('editPlanId').value;
            const formData = new FormData(event.target);
            const features = Array.from(document.querySelectorAll('#editFeaturesContainer .feature-input'))
                .map(input => input.querySelector('.feature-input').value.trim())
                .filter(f => f);
            const availableModels = Array.from(document.querySelectorAll('#editModelsContainer .model-input'))
                .map(input => input.value.trim())
                .filter(m => m);
            
            const updates = {
                name: formData.get('name'),
                price: parseInt(formData.get('price')),
                credits: parseInt(formData.get('credits')),
                users: parseInt(formData.get('users')),
                features: features,
                available_models: availableModels
            };
            
            try {
                const response = await fetch('/api/admin/plans/' + encodeURIComponent(planId), {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updates)
                });
                
                const data = await response.json();
                if (data.ok) {
                    alert('Plan updated successfully');
                    closeEditModal();
                    location.reload();
                } else {
                    alert('Error: ' + (data.err || 'Failed to update plan'));
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error updating plan');
            }
        }
        
        async function deletePlan(planId) {
            if (!confirm('Are you sure you want to delete this plan?')) {
                return;
            }
            
            try {
                const response = await fetch('/api/admin/plans/' + encodeURIComponent(planId), {
                    method: 'DELETE'
                });
                
                const data = await response.json();
                if (data.ok) {
                    alert('Plan deleted successfully');
                    location.reload();
                } else {
                    alert('Error: ' + (data.err || 'Failed to delete plan'));
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error deleting plan');
            }
        }
    </script>
</body>
</html>
  `;
}
