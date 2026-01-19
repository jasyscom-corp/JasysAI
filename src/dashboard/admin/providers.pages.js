export function AIProvidersManagementPage(data) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Providers - Admin Dashboard</title>
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
        .modal-content { background: white; border-radius: 8px; padding: 2rem; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto; }
        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .modal-header h3 { color: #1e293b; font-size: 1.25rem; }
        .modal-close { background: none; border: none; color: #64748b; cursor: pointer; font-size: 1.5rem; }
        .status-badge { padding: 0.25rem 0.5rem; border-radius: 12px; font-size: 0.75rem; font-weight: 500; }
        .status-active { background: #10b981; color: white; }
        .status-inactive { background: #64748b; color: white; }
    </style>
</head>
<body>
    <div class="header">
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <h1>AI Providers Management</h1>
            <nav style="display: flex; gap: 1rem;">
                <a href="/admin/dashboard" style="color: #64748b; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">Dashboard</a>
                <a href="/admin/users" style="color: #64748b; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">Users</a>
                <a href="/admin/providers" style="color: #1e293b; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px; background: #f1f5f9;">AI Providers</a>
                <a href="/admin/plans" style="color: #64748b; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">Subscription Plans</a>
                <a href="/admin/packages" style="color: #64748b; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">Credit Packages</a>
                <a href="/admin" style="color: #dc2626; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">Logout</a>
            </nav>
        </div>
    </div>
    
    <div class="container">
        <div class="section">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h2>AI Providers</h2>
                <button class="btn" onclick="openAddModal()">Add Provider</button>
            </div>
            
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Endpoint</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="providersTableBody">
                    ${(data.providers || []).map(provider => `
                        <tr>
                            <td>${provider.id}</td>
                            <td>${provider.name}</td>
                            <td>${provider.endpoint}</td>
                            <td><span class="status-badge ${provider.active ? 'status-active' : 'status-inactive'}">${provider.active ? 'Active' : 'Inactive'}</span></td>
                            <td>
                                <button class="btn" onclick="editProvider('${provider.id}')">Edit</button>
                                <button class="btn ${provider.active ? 'btn-danger' : 'btn-success'}" onclick="toggleProvider('${provider.id}')">${provider.active ? 'Deactivate' : 'Activate'}</button>
                                <button class="btn btn-danger" onclick="deleteProvider('${provider.id}')">Delete</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    </div>
    
    <!-- Add Provider Modal -->
    <div id="addProviderModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Add AI Provider</h3>
                <button class="modal-close" onclick="closeAddModal()">&times;</button>
            </div>
            <form id="addProviderForm" onsubmit="addProvider(event)">
                <div class="form-group">
                    <label for="providerId">Provider ID</label>
                    <input type="text" id="providerId" name="id" required placeholder="e.g. openrouter">
                </div>
                <div class="form-group">
                    <label for="providerName">Name</label>
                    <input type="text" id="providerName" name="name" required placeholder="e.g. OpenRouter">
                </div>
                <div class="form-group">
                    <label for="providerEndpoint">API Endpoint</label>
                    <input type="text" id="providerEndpoint" name="endpoint" required placeholder="e.g. https://openrouter.ai/api/v1">
                </div>
                <div class="form-group">
                    <label for="providerApiKey">API Key</label>
                    <input type="password" id="providerApiKey" name="api_key" placeholder="Enter API key">
                </div>
                <div class="form-group">
                    <label for="providerActive">Active</label>
                    <select id="providerActive" name="active">
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                </div>
                <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 1rem;">
                    <button type="button" class="btn" onclick="closeAddModal()">Cancel</button>
                    <button type="submit" class="btn btn-success">Add Provider</button>
                </div>
            </form>
        </div>
    </div>
    
    <!-- Edit Provider Modal -->
    <div id="editProviderModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Edit AI Provider</h3>
                <button class="modal-close" onclick="closeEditModal()">&times;</button>
            </div>
            <form id="editProviderForm" onsubmit="updateProvider(event)">
                <input type="hidden" id="editProviderId">
                <div class="form-group">
                    <label for="editProviderName">Name</label>
                    <input type="text" id="editProviderName" name="name" required>
                </div>
                <div class="form-group">
                    <label for="editProviderEndpoint">API Endpoint</label>
                    <input type="text" id="editProviderEndpoint" name="endpoint" required>
                </div>
                <div class="form-group">
                    <label for="editProviderApiKey">API Key</label>
                    <input type="password" id="editProviderApiKey" name="api_key" placeholder="Leave empty to keep current">
                </div>
                <div class="form-group">
                    <label for="editProviderActive">Active</label>
                    <select id="editProviderActive" name="active">
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                </div>
                <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 1rem;">
                    <button type="button" class="btn" onclick="closeEditModal()">Cancel</button>
                    <button type="submit" class="btn btn-success">Update Provider</button>
                </div>
            </form>
        </div>
    </div>
    
    <script>
        // Load providers data
        let providersData = ${JSON.stringify(data.providers || [])};
        
        function openAddModal() {
            document.getElementById('addProviderModal').classList.add('active');
            document.getElementById('addProviderForm').reset();
        }
        
        function closeAddModal() {
            document.getElementById('addProviderModal').classList.remove('active');
        }
        
        function openEditModal() {
            document.getElementById('editProviderModal').classList.add('active');
        }
        
        function closeEditModal() {
            document.getElementById('editProviderModal').classList.remove('active');
        }
        
        function editProvider(providerId) {
            const provider = providersData.find(p => p.id === providerId);
            if (!provider) return;
            
            document.getElementById('editProviderId').value = provider.id;
            document.getElementById('editProviderName').value = provider.name;
            document.getElementById('editProviderEndpoint').value = provider.endpoint;
            document.getElementById('editProviderApiKey').value = '';
            document.getElementById('editProviderActive').value = provider.active ? 'true' : 'false';
            openEditModal();
        }
        
        async function addProvider(event) {
            event.preventDefault();
            
            const formData = new FormData(event.target);
            const provider = {
                id: formData.get('id'),
                name: formData.get('name'),
                endpoint: formData.get('endpoint'),
                api_key: formData.get('api_key'),
                active: formData.get('active') === 'true'
            };
            
            try {
                const response = await fetch('/api/admin/providers', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(provider)
                });
                
                const data = await response.json();
                if (data.ok) {
                    alert('Provider added successfully');
                    closeAddModal();
                    location.reload();
                } else {
                    alert('Error: ' + (data.err || 'Failed to add provider'));
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error adding provider');
            }
        }
        
        async function updateProvider(event) {
            event.preventDefault();
            
            const providerId = document.getElementById('editProviderId').value;
            const formData = new FormData(event.target);
            const updates = {
                name: formData.get('name'),
                endpoint: formData.get('endpoint'),
                active: formData.get('active') === 'true'
            };
            
            if (formData.get('api_key')) {
                updates.api_key = formData.get('api_key');
            }
            
            try {
                const response = await fetch('/api/admin/providers/' + encodeURIComponent(providerId), {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updates)
                });
                
                const data = await response.json();
                if (data.ok) {
                    alert('Provider updated successfully');
                    closeEditModal();
                    location.reload();
                } else {
                    alert('Error: ' + (data.err || 'Failed to update provider'));
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error updating provider');
            }
        }
        
        async function deleteProvider(providerId) {
            if (!confirm('Are you sure you want to delete this provider?')) {
                return;
            }
            
            try {
                const response = await fetch('/api/admin/providers/' + encodeURIComponent(providerId), {
                    method: 'DELETE'
                });
                
                const data = await response.json();
                if (data.ok) {
                    alert('Provider deleted successfully');
                    location.reload();
                } else {
                    alert('Error: ' + (data.err || 'Failed to delete provider'));
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error deleting provider');
            }
        }
        
        async function toggleProvider(providerId) {
            const provider = providersData.find(p => p.id === providerId);
            if (!provider) return;
            
            try {
                const response = await fetch('/api/admin/providers/' + encodeURIComponent(providerId), {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ active: !provider.active })
                });
                
                const data = await response.json();
                if (data.ok) {
                    alert('Provider status updated');
                    location.reload();
                } else {
                    alert('Error: ' + (data.err || 'Failed to update provider status'));
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error updating provider status');
            }
        }
    </script>
</body>
</html>
  `;
}
