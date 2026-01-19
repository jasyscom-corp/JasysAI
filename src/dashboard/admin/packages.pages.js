export function CreditPackagesManagementPage(data) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Credit Packages - Admin Dashboard</title>
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
        .tag { display: inline-block; background: #e0e7ff; color: #4f46e5; padding: 0.25rem 0.5rem; border-radius: 6px; font-size: 0.75rem; margin-right: 0.25rem; margin-bottom: 0.25rem; }
        .tag-remove { margin-left: 0.25rem; cursor: pointer; color: #ef4444; }
        .model-input { display: flex; gap: 0.5rem; margin-bottom: 0.5rem; }
    </style>
</head>
<body>
    <div class="header">
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <h1>Credit Packages Management</h1>
            <nav style="display: flex; gap: 1rem;">
                <a href="/admin/dashboard" style="color: #64748b; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">Dashboard</a>
                <a href="/admin/users" style="color: #64748b; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">Users</a>
                <a href="/admin/providers" style="color: #64748b; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">AI Providers</a>
                <a href="/admin/plans" style="color: #64748b; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">Subscription Plans</a>
                <a href="/admin/packages" style="color: #1e293b; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px; background: #f1f5f9;">Credit Packages</a>
                <a href="/admin" style="color: #dc2626; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">Logout</a>
            </nav>
        </div>
    </div>
    
    <div class="container">
        <div class="section">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h2>Credit Packages</h2>
                <button class="btn" onclick="openAddModal()">Add Package</button>
            </div>
            
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price (IDR)</th>
                        <th>Credits</th>
                        <th>Bonus Models</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="packagesTableBody">
                    ${(data.packages || []).map(pkg => `
                        <tr>
                            <td>${pkg.id}</td>
                            <td>${pkg.name}</td>
                            <td>${pkg.price.toLocaleString('id-ID')}</td>
                            <td>${pkg.credits.toLocaleString('id-ID')}</td>
                            <td>
                                ${(pkg.bonus_models || []).map(m => `<span class="tag">${m}</span>`).join('')}
                            </td>
                            <td>
                                <button class="btn" onclick="editPackage('${pkg.id}')">Edit</button>
                                <button class="btn btn-danger" onclick="deletePackage('${pkg.id}')">Delete</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    </div>
    
    <!-- Add Package Modal -->
    <div id="addPackageModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Add Credit Package</h3>
                <button class="modal-close" onclick="closeAddModal()">&times;</button>
            </div>
            <form id="addPackageForm" onsubmit="addPackage(event)">
                <div class="form-group">
                    <label for="packageId">Package ID</label>
                    <input type="text" id="packageId" name="id" required placeholder="e.g. premium">
                </div>
                <div class="form-group">
                    <label for="packageName">Package Name</label>
                    <input type="text" id="packageName" name="name" required placeholder="e.g. Premium Package">
                </div>
                <div class="form-group">
                    <label for="packagePrice">Price (IDR)</label>
                    <input type="number" id="packagePrice" name="price" required min="0" placeholder="e.g. 50000">
                </div>
                <div class="form-group">
                    <label for="packageCredits">Credits</label>
                    <input type="number" id="packageCredits" name="credits" required min="0" placeholder="e.g. 10000">
                </div>
                <div class="form-group">
                    <label>Bonus Models</label>
                    <div id="addModelsContainer">
                        <div class="model-input">
                            <input type="text" class="model-input" placeholder="Enter model ID" style="flex: 1;">
                            <button type="button" class="btn btn-danger" onclick="this.parentElement.remove()">×</button>
                        </div>
                    </div>
                    <button type="button" class="btn" onclick="addModelInput('add')">Add Model</button>
                </div>
                <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 1rem;">
                    <button type="button" class="btn" onclick="closeAddModal()">Cancel</button>
                    <button type="submit" class="btn btn-success">Add Package</button>
                </div>
            </form>
        </div>
    </div>
    
    <!-- Edit Package Modal -->
    <div id="editPackageModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Edit Credit Package</h3>
                <button class="modal-close" onclick="closeEditModal()">&times;</button>
            </div>
            <form id="editPackageForm" onsubmit="updatePackage(event)">
                <input type="hidden" id="editPackageId">
                <div class="form-group">
                    <label for="editPackageName">Package Name</label>
                    <input type="text" id="editPackageName" name="name" required>
                </div>
                <div class="form-group">
                    <label for="editPackagePrice">Price (IDR)</label>
                    <input type="number" id="editPackagePrice" name="price" required min="0">
                </div>
                <div class="form-group">
                    <label for="editPackageCredits">Credits</label>
                    <input type="number" id="editPackageCredits" name="credits" required min="0">
                </div>
                <div class="form-group">
                    <label>Bonus Models</label>
                    <div id="editModelsContainer"></div>
                    <button type="button" class="btn" onclick="addModelInput('edit')">Add Model</button>
                </div>
                <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 1rem;">
                    <button type="button" class="btn" onclick="closeEditModal()">Cancel</button>
                    <button type="submit" class="btn btn-success">Update Package</button>
                </div>
            </form>
        </div>
    </div>
    
    <script>
        // Load packages data
        let packagesData = ${JSON.stringify(data.packages || [])};
        
        function openAddModal() {
            document.getElementById('addPackageModal').classList.add('active');
            document.getElementById('addPackageForm').reset();
            document.getElementById('addModelsContainer').innerHTML = \`
                <div class="model-input">
                    <input type="text" class="model-input" placeholder="Enter model ID" style="flex: 1;">
                    <button type="button" class="btn btn-danger" onclick="this.parentElement.remove()">×</button>
                </div>
            \`;
        }
        
        function closeAddModal() {
            document.getElementById('addPackageModal').classList.remove('active');
        }
        
        function openEditModal() {
            document.getElementById('editPackageModal').classList.add('active');
        }
        
        function closeEditModal() {
            document.getElementById('editPackageModal').classList.remove('active');
        }
        
        function addModelInput(formType) {
            const container = document.getElementById(formType === 'add' ? 'addModelsContainer' : 'editModelsContainer');
            const inputDiv = document.createElement('div');
            inputDiv.className = 'model-input';
            inputDiv.innerHTML = \`
                <input type="text" class="model-input" placeholder="Enter model ID" style="flex: 1;">
                <button type="button" class="btn btn-danger" onclick="this.parentElement.remove()">×</button>
            \`;
            container.appendChild(inputDiv);
        }
        
        function editPackage(packageId) {
            const pkg = packagesData.find(p => p.id === packageId);
            if (!pkg) return;
            
            document.getElementById('editPackageId').value = pkg.id;
            document.getElementById('editPackageName').value = pkg.name;
            document.getElementById('editPackagePrice').value = pkg.price;
            document.getElementById('editPackageCredits').value = pkg.credits;
            
            // Load bonus models
            const modelsContainer = document.getElementById('editModelsContainer');
            modelsContainer.innerHTML = (pkg.bonus_models || []).map(m => \`
                <div class="model-input">
                    <input type="text" class="model-input" value="\${m}" style="flex: 1;">
                    <button type="button" class="btn btn-danger" onclick="this.parentElement.remove()">×</button>
                </div>
            \`).join('');
            
            openEditModal();
        }
        
        async function addPackage(event) {
            event.preventDefault();
            
            const formData = new FormData(event.target);
            const bonusModels = Array.from(document.querySelectorAll('#addModelsContainer .model-input'))
                .map(input => input.value.trim())
                .filter(m => m);
            
            const pkg = {
                id: formData.get('id'),
                name: formData.get('name'),
                price: parseInt(formData.get('price')),
                credits: parseInt(formData.get('credits')),
                bonus_models: bonusModels
            };
            
            try {
                const response = await fetch('/api/admin/packages', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(pkg)
                });
                
                const data = await response.json();
                if (data.ok) {
                    alert('Package added successfully');
                    closeAddModal();
                    location.reload();
                } else {
                    alert('Error: ' + (data.err || 'Failed to add package'));
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error adding package');
            }
        }
        
        async function updatePackage(event) {
            event.preventDefault();
            
            const packageId = document.getElementById('editPackageId').value;
            const formData = new FormData(event.target);
            const bonusModels = Array.from(document.querySelectorAll('#editModelsContainer .model-input'))
                .map(input => input.value.trim())
                .filter(m => m);
            
            const updates = {
                name: formData.get('name'),
                price: parseInt(formData.get('price')),
                credits: parseInt(formData.get('credits')),
                bonus_models: bonusModels
            };
            
            try {
                const response = await fetch('/api/admin/packages/' + encodeURIComponent(packageId), {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updates)
                });
                
                const data = await response.json();
                if (data.ok) {
                    alert('Package updated successfully');
                    closeEditModal();
                    location.reload();
                } else {
                    alert('Error: ' + (data.err || 'Failed to update package'));
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error updating package');
            }
        }
        
        async function deletePackage(packageId) {
            if (!confirm('Are you sure you want to delete this package?')) {
                return;
            }
            
            try {
                const response = await fetch('/api/admin/packages/' + encodeURIComponent(packageId), {
                    method: 'DELETE'
                });
                
                const data = await response.json();
                if (data.ok) {
                    alert('Package deleted successfully');
                    location.reload();
                } else {
                    alert('Error: ' + (data.err || 'Failed to delete package'));
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error deleting package');
            }
        }
    </script>
</body>
</html>
  `;
}
