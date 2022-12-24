export default function Sidebar() {
	return (
		<div className="drawer drawer-end">
			<input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content">
				<label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">
					Open drawer
				</label>
			</div>
			<div className="drawer-side">
				<label htmlFor="my-drawer-4" className="drawer-overlay" />
				<ul className="menu p-4 w-80 bg-base-100 text-base-content">
					<li>
						<h2>Sidebar Item 1</h2>
					</li>
					<li>
						<h2>Sidebar Item 2</h2>
					</li>
				</ul>
			</div>
		</div>
	);
}
