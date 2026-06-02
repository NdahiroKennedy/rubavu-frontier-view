import { useState } from 'react';
import { Plus, Trash2, Pencil, Check, X, RotateCcw, Lock, Eye, EyeOff } from 'lucide-react';
import { useStore } from '../data/StoreContext';
import { Room, GalleryItem, Experience, MenuItem, GuestQuote, generateId } from '../data/store';

const ADMIN_PASSWORD = 'frontier';

type TabId = 'rooms' | 'gallery' | 'experiences' | 'restaurant' | 'quotes';

// ─── small reusable input styles ───────────────────────────────────────────
const inputCls =
  'w-full bg-white border border-[#D9D3C7] px-3 py-2 text-sm text-[#2C2C2C] focus:outline-none focus:border-[#4A5240] rounded-sm transition-colors';
const labelCls = 'block text-[11px] font-mono uppercase tracking-wider text-[#7A7468] mb-1';
const btnPrimary =
  'bg-[#4A5240] hover:bg-[#2E3A28] text-[#F5F1EB] px-4 py-2 text-xs font-mono uppercase tracking-widest rounded-sm transition-colors flex items-center gap-2';
const btnOutline =
  'border border-[#D9D3C7] hover:border-[#7A7468] text-[#7A7468] hover:text-[#2C2C2C] px-3 py-1.5 text-xs font-mono uppercase tracking-widest rounded-sm transition-colors flex items-center gap-1.5';
const btnDanger =
  'border border-red-200 hover:border-red-400 text-red-400 hover:text-red-600 px-3 py-1.5 text-xs font-mono uppercase tracking-widest rounded-sm transition-colors flex items-center gap-1.5';

// ─── Login Screen ───────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError(true);
      setPw('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1EB] flex items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#4A5240]/10 mb-4">
            <Lock className="h-5 w-5 text-[#4A5240]" />
          </div>
          <h1 className="font-serif text-3xl font-light text-[#2C2C2C]">Admin Access</h1>
          <p className="font-mono text-[11px] uppercase tracking-widest text-[#7A7468]">
            Rubavu Frontier View
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className={labelCls}>Access Code</label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={pw}
                onChange={(e) => { setPw(e.target.value); setError(false); }}
                placeholder="Enter access code"
                className={`${inputCls} pr-10 ${error ? 'border-red-400' : ''}`}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A7468] hover:text-[#2C2C2C] transition-colors"
              >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {error && (
              <p className="text-red-500 text-[11px] mt-1 font-mono">Incorrect access code.</p>
            )}
          </div>
          <button type="submit" className={`${btnPrimary} w-full justify-center py-3`}>
            Enter Admin Panel
          </button>
        </form>

        <p className="text-center font-mono text-[10px] text-[#D9D3C7]">
          Restricted area — lodge management only
        </p>
      </div>
    </div>
  );
}

// ─── Section Header ─────────────────────────────────────────────────────────
function SectionHeader({ title, count, onAdd }: { title: string; count: number; onAdd: () => void }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="font-serif text-2xl font-light text-[#2C2C2C]">{title}</h2>
        <span className="font-mono text-[10px] text-[#7A7468] uppercase tracking-wider">{count} item{count !== 1 ? 's' : ''}</span>
      </div>
      <button onClick={onAdd} className={btnPrimary}>
        <Plus className="h-3.5 w-3.5" /> Add New
      </button>
    </div>
  );
}

// ─── Rooms Tab ───────────────────────────────────────────────────────────────
function RoomsTab() {
  const { data, setData } = useStore();
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Room>>({});
  const [featuresInput, setFeaturesInput] = useState('');

  const startAdd = () => {
    setForm({ id: generateId(), name: '', tagline: '', description: '', capacity: '2 Adults', features: [] });
    setFeaturesInput('');
    setEditId('__new__');
  };

  const startEdit = (r: Room) => {
    setForm({ ...r });
    setFeaturesInput(r.features.join('\n'));
    setEditId(r.id);
  };

  const saveRoom = () => {
    const features = featuresInput.split('\n').map((s) => s.trim()).filter(Boolean);
    const room = { ...form, features } as Room;
    const rooms =
      editId === '__new__'
        ? [...data.rooms, room]
        : data.rooms.map((r) => (r.id === editId ? room : r));
    setData({ ...data, rooms });
    setEditId(null);
  };

  const deleteRoom = (id: string) => {
    if (confirm('Delete this room?')) setData({ ...data, rooms: data.rooms.filter((r) => r.id !== id) });
  };

  return (
    <div>
      <SectionHeader title="Rooms & Suites" count={data.rooms.length} onAdd={startAdd} />

      {/* Add/Edit form */}
      {editId !== null && (
        <div className="mb-8 bg-white border border-[#D9D3C7] rounded-sm p-6 space-y-4">
          <h3 className="font-serif text-lg text-[#2C2C2C] font-light">
            {editId === '__new__' ? 'Add New Room' : 'Edit Room'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Name</label>
              <input className={inputCls} value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Frontier Suite" />
            </div>
            <div>
              <label className={labelCls}>Tagline</label>
              <input className={inputCls} value={form.tagline || ''} onChange={(e) => setForm({ ...form, tagline: e.target.value })} placeholder="e.g. The Ultimate Lakeside Sanctuary" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Capacity</label>
              <input className={inputCls} value={form.capacity || ''} onChange={(e) => setForm({ ...form, capacity: e.target.value })} placeholder="e.g. 2 Adults" />
            </div>
          </div>
          <div>
            <label className={labelCls}>Description</label>
            <textarea className={inputCls} rows={3} value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Room description..." />
          </div>
          <div>
            <label className={labelCls}>Features (one per line)</label>
            <textarea className={inputCls} rows={4} value={featuresInput} onChange={(e) => setFeaturesInput(e.target.value)} placeholder={"Private terrace\nFreestanding bath\n..."} />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={saveRoom} className={btnPrimary}><Check className="h-3.5 w-3.5" /> Save Room</button>
            <button onClick={() => setEditId(null)} className={btnOutline}><X className="h-3.5 w-3.5" /> Cancel</button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {data.rooms.length === 0 && <p className="text-[#7A7468] text-sm font-sans text-center py-8">No rooms yet.</p>}
        {data.rooms.map((room) => (
          <div key={room.id} className="bg-white border border-[#D9D3C7] rounded-sm p-5 flex items-start justify-between gap-4">
            <div className="space-y-1 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-serif text-lg text-[#2C2C2C]">{room.name}</h4>
                <span className="font-mono text-[10px] text-[#4A5240] bg-[#4A5240]/10 px-2 py-0.5 rounded-full">{room.capacity}</span>
              </div>
              <p className="text-xs font-mono text-[#7A7468] italic">{room.tagline}</p>
              <p className="text-xs text-[#7A7468] font-sans leading-relaxed line-clamp-2">{room.description}</p>
              <p className="text-[10px] font-mono text-[#4A5240]">{room.features.length} features</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => startEdit(room)} className={btnOutline}><Pencil className="h-3 w-3" /> Edit</button>
              <button onClick={() => deleteRoom(room.id)} className={btnDanger}><Trash2 className="h-3 w-3" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Gallery Tab ─────────────────────────────────────────────────────────────
function GalleryTab() {
  const { data, setData } = useStore();
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<GalleryItem>>({});

  const startAdd = () => {
    setForm({ id: generateId(), src: '', category: '', title: '', desc: '' });
    setEditId('__new__');
  };

  const startEdit = (g: GalleryItem) => {
    setForm({ ...g });
    setEditId(g.id);
  };

  const saveItem = () => {
    const item = form as GalleryItem;
    const gallery =
      editId === '__new__'
        ? [...data.gallery, item]
        : data.gallery.map((g) => (g.id === editId ? item : g));
    setData({ ...data, gallery });
    setEditId(null);
  };

  const deleteItem = (id: string) => {
    if (confirm('Remove this gallery image?')) setData({ ...data, gallery: data.gallery.filter((g) => g.id !== id) });
  };

  return (
    <div>
      <SectionHeader title="Gallery Images" count={data.gallery.length} onAdd={startAdd} />

      {editId !== null && (
        <div className="mb-8 bg-white border border-[#D9D3C7] rounded-sm p-6 space-y-4">
          <h3 className="font-serif text-lg text-[#2C2C2C] font-light">
            {editId === '__new__' ? 'Add Gallery Image' : 'Edit Image'}
          </h3>
          <div>
            <label className={labelCls}>Image URL</label>
            <input className={inputCls} value={form.src || ''} onChange={(e) => setForm({ ...form, src: e.target.value })} placeholder="https://..." />
            {form.src && <img src={form.src} alt="preview" className="mt-2 h-32 object-cover rounded-sm border border-[#D9D3C7]" onError={(e) => (e.currentTarget.style.display = 'none')} />}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Title</label>
              <input className={inputCls} value={form.title || ''} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Lake Kivu Horizon" />
            </div>
            <div>
              <label className={labelCls}>Category</label>
              <input className={inputCls} value={form.category || ''} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Landscape" />
            </div>
          </div>
          <div>
            <label className={labelCls}>Description</label>
            <textarea className={inputCls} rows={2} value={form.desc || ''} onChange={(e) => setForm({ ...form, desc: e.target.value })} placeholder="Short caption..." />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={saveItem} className={btnPrimary}><Check className="h-3.5 w-3.5" /> Save</button>
            <button onClick={() => setEditId(null)} className={btnOutline}><X className="h-3.5 w-3.5" /> Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.gallery.length === 0 && <p className="col-span-4 text-[#7A7468] text-sm font-sans text-center py-8">No gallery items yet.</p>}
        {data.gallery.map((item) => (
          <div key={item.id} className="bg-white border border-[#D9D3C7] rounded-sm overflow-hidden group">
            <div className="relative aspect-square overflow-hidden">
              <img src={item.src} alt={item.title} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = ''; e.currentTarget.className = 'w-full h-full bg-[#EDEBDF]'; }} />
              <span className="absolute bottom-2 left-2 bg-[#2C2C2C]/80 text-white font-mono text-[8px] uppercase tracking-widest px-1.5 py-0.5 rounded-sm">
                {item.category}
              </span>
            </div>
            <div className="p-3 space-y-2">
              <p className="font-serif text-sm text-[#2C2C2C] truncate">{item.title}</p>
              <div className="flex gap-2">
                <button onClick={() => startEdit(item)} className={`${btnOutline} flex-1 justify-center`}><Pencil className="h-3 w-3" /></button>
                <button onClick={() => deleteItem(item.id)} className={`${btnDanger} flex-1 justify-center`}><Trash2 className="h-3 w-3" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Experiences Tab ─────────────────────────────────────────────────────────
function ExperiencesTab() {
  const { data, setData } = useStore();
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Experience>>({});

  const ICONS = ['Ship', 'Trees', 'Compass', 'Users', 'Wine', 'Sunrise'];

  const startAdd = () => {
    const nextRoman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][data.experiences.length] || String(data.experiences.length + 1);
    setForm({ id: generateId(), roman: nextRoman, title: '', iconName: 'Compass', description: '', duration: '', nature: '' });
    setEditId('__new__');
  };

  const startEdit = (e: Experience) => { setForm({ ...e }); setEditId(e.id); };

  const saveExp = () => {
    const exp = form as Experience;
    const experiences = editId === '__new__' ? [...data.experiences, exp] : data.experiences.map((e) => (e.id === editId ? exp : e));
    setData({ ...data, experiences });
    setEditId(null);
  };

  const deleteExp = (id: string) => {
    if (confirm('Remove this experience?')) setData({ ...data, experiences: data.experiences.filter((e) => e.id !== id) });
  };

  return (
    <div>
      <SectionHeader title="Experiences" count={data.experiences.length} onAdd={startAdd} />

      {editId !== null && (
        <div className="mb-8 bg-white border border-[#D9D3C7] rounded-sm p-6 space-y-4">
          <h3 className="font-serif text-lg text-[#2C2C2C] font-light">{editId === '__new__' ? 'Add Experience' : 'Edit Experience'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Roman Numeral</label>
              <input className={inputCls} value={form.roman || ''} onChange={(e) => setForm({ ...form, roman: e.target.value })} placeholder="I" />
            </div>
            <div>
              <label className={labelCls}>Title</label>
              <input className={inputCls} value={form.title || ''} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Lake Kivu by Boat" />
            </div>
            <div>
              <label className={labelCls}>Icon</label>
              <select className={inputCls} value={form.iconName || 'Compass'} onChange={(e) => setForm({ ...form, iconName: e.target.value })}>
                {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className={labelCls}>Description</label>
            <textarea className={inputCls} rows={3} value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Duration</label>
              <input className={inputCls} value={form.duration || ''} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="e.g. 2 Hours" />
            </div>
            <div>
              <label className={labelCls}>Nature</label>
              <input className={inputCls} value={form.nature || ''} onChange={(e) => setForm({ ...form, nature: e.target.value })} placeholder="e.g. Private Outing" />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={saveExp} className={btnPrimary}><Check className="h-3.5 w-3.5" /> Save</button>
            <button onClick={() => setEditId(null)} className={btnOutline}><X className="h-3.5 w-3.5" /> Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {data.experiences.length === 0 && <p className="text-[#7A7468] text-sm font-sans text-center py-8">No experiences yet.</p>}
        {data.experiences.map((exp) => (
          <div key={exp.id} className="bg-white border border-[#D9D3C7] rounded-sm p-5 flex items-start justify-between gap-4">
            <div className="space-y-1 flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <span className="font-serif text-xl text-[#7A7468]/60">{exp.roman}</span>
                <h4 className="font-serif text-lg text-[#2C2C2C]">{exp.title}</h4>
                <span className="font-mono text-[9px] text-[#4A5240] bg-[#4A5240]/10 px-2 py-0.5 rounded-full uppercase">{exp.nature}</span>
              </div>
              <p className="text-xs text-[#7A7468] font-sans leading-relaxed line-clamp-2">{exp.description}</p>
              <p className="text-[10px] font-mono text-[#7A7468] italic">{exp.duration} · Icon: {exp.iconName}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => startEdit(exp)} className={btnOutline}><Pencil className="h-3 w-3" /> Edit</button>
              <button onClick={() => deleteExp(exp.id)} className={btnDanger}><Trash2 className="h-3 w-3" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Restaurant Tab ───────────────────────────────────────────────────────────
function RestaurantTab() {
  const { data, setData } = useStore();
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<MenuItem>>({});
  const [activeSection, setActiveSection] = useState<'menu' | 'drinks'>('menu');

  const filtered = data.menuItems.filter((m) => m.section === activeSection);

  const startAdd = () => {
    setForm({ id: generateId(), section: activeSection, course: '', name: '', description: '' });
    setEditId('__new__');
  };

  const startEdit = (m: MenuItem) => { setForm({ ...m }); setEditId(m.id); };

  const saveItem = () => {
    const item = form as MenuItem;
    const menuItems = editId === '__new__' ? [...data.menuItems, item] : data.menuItems.map((m) => (m.id === editId ? item : m));
    setData({ ...data, menuItems });
    setEditId(null);
  };

  const deleteItem = (id: string) => {
    if (confirm('Remove this item?')) setData({ ...data, menuItems: data.menuItems.filter((m) => m.id !== id) });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif text-2xl font-light text-[#2C2C2C]">Restaurant & Bar</h2>
          <span className="font-mono text-[10px] text-[#7A7468] uppercase tracking-wider">{data.menuItems.length} items total</span>
        </div>
        <button onClick={startAdd} className={btnPrimary}><Plus className="h-3.5 w-3.5" /> Add Item</button>
      </div>

      {/* Sub-tabs */}
      <div className="flex border-b border-[#D9D3C7] mb-6">
        {(['menu', 'drinks'] as const).map((s) => (
          <button
            key={s}
            onClick={() => { setActiveSection(s); setEditId(null); }}
            className={`px-5 py-2.5 font-mono text-xs uppercase tracking-widest border-b-2 transition-colors -mb-px ${
              activeSection === s ? 'border-[#4A5240] text-[#4A5240]' : 'border-transparent text-[#7A7468] hover:text-[#2C2C2C]'
            }`}
          >
            {s === 'menu' ? 'Kitchen Menu' : 'Signature Drinks'}
          </button>
        ))}
      </div>

      {editId !== null && (
        <div className="mb-8 bg-white border border-[#D9D3C7] rounded-sm p-6 space-y-4">
          <h3 className="font-serif text-lg text-[#2C2C2C] font-light">{editId === '__new__' ? 'Add Item' : 'Edit Item'}</h3>
          {activeSection === 'menu' && (
            <div>
              <label className={labelCls}>Course (e.g. First Course)</label>
              <input className={inputCls} value={form.course || ''} onChange={(e) => setForm({ ...form, course: e.target.value })} placeholder="First Course" />
            </div>
          )}
          <div>
            <label className={labelCls}>Name</label>
            <input className={inputCls} value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Dish or drink name" />
          </div>
          <div>
            <label className={labelCls}>Description</label>
            <textarea className={inputCls} rows={2} value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Ingredients / description..." />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={saveItem} className={btnPrimary}><Check className="h-3.5 w-3.5" /> Save</button>
            <button onClick={() => setEditId(null)} className={btnOutline}><X className="h-3.5 w-3.5" /> Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {filtered.length === 0 && <p className="text-[#7A7468] text-sm font-sans text-center py-8">No {activeSection === 'menu' ? 'menu items' : 'drinks'} yet.</p>}
        {filtered.map((item) => (
          <div key={item.id} className="bg-white border border-[#D9D3C7] rounded-sm p-4 flex items-start justify-between gap-4">
            <div className="space-y-0.5 flex-1 min-w-0">
              {item.course && <span className="font-mono text-[9px] uppercase tracking-widest text-[#7A7468]">{item.course}</span>}
              <h4 className="font-serif text-lg text-[#2C2C2C]">{item.name}</h4>
              <p className="text-xs text-[#7A7468] font-sans leading-relaxed line-clamp-1">{item.description}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => startEdit(item)} className={btnOutline}><Pencil className="h-3 w-3" /> Edit</button>
              <button onClick={() => deleteItem(item.id)} className={btnDanger}><Trash2 className="h-3 w-3" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Quotes Tab ───────────────────────────────────────────────────────────────
function QuotesTab() {
  const { data, setData } = useStore();
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<GuestQuote>>({});

  const startAdd = () => { setForm({ id: generateId(), text: '', attribution: '' }); setEditId('__new__'); };
  const startEdit = (q: GuestQuote) => { setForm({ ...q }); setEditId(q.id); };

  const saveQuote = () => {
    const quote = form as GuestQuote;
    const quotes = editId === '__new__' ? [...data.quotes, quote] : data.quotes.map((q) => (q.id === editId ? quote : q));
    setData({ ...data, quotes });
    setEditId(null);
  };

  const deleteQuote = (id: string) => {
    if (confirm('Remove this quote?')) setData({ ...data, quotes: data.quotes.filter((q) => q.id !== id) });
  };

  return (
    <div>
      <SectionHeader title="Guest Quotes" count={data.quotes.length} onAdd={startAdd} />
      <p className="text-xs text-[#7A7468] font-sans mb-6">The first quote is displayed on the Home page.</p>

      {editId !== null && (
        <div className="mb-8 bg-white border border-[#D9D3C7] rounded-sm p-6 space-y-4">
          <h3 className="font-serif text-lg text-[#2C2C2C] font-light">{editId === '__new__' ? 'Add Quote' : 'Edit Quote'}</h3>
          <div>
            <label className={labelCls}>Quote Text</label>
            <textarea className={inputCls} rows={3} value={form.text || ''} onChange={(e) => setForm({ ...form, text: e.target.value })} placeholder="The guest's words..." />
          </div>
          <div>
            <label className={labelCls}>Attribution</label>
            <input className={inputCls} value={form.attribution || ''} onChange={(e) => setForm({ ...form, attribution: e.target.value })} placeholder="— A guest, 2025" />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={saveQuote} className={btnPrimary}><Check className="h-3.5 w-3.5" /> Save</button>
            <button onClick={() => setEditId(null)} className={btnOutline}><X className="h-3.5 w-3.5" /> Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {data.quotes.length === 0 && <p className="text-[#7A7468] text-sm font-sans text-center py-8">No quotes yet.</p>}
        {data.quotes.map((q, i) => (
          <div key={q.id} className="bg-white border border-[#D9D3C7] rounded-sm p-5 flex items-start justify-between gap-4">
            <div className="space-y-1 flex-1 min-w-0">
              {i === 0 && <span className="font-mono text-[9px] text-[#4A5240] uppercase tracking-widest">Featured on Home</span>}
              <p className="font-serif text-base text-[#2C2C2C] italic leading-relaxed">"{q.text}"</p>
              <p className="font-mono text-xs text-[#7A7468]">{q.attribution}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => startEdit(q)} className={btnOutline}><Pencil className="h-3 w-3" /> Edit</button>
              <button onClick={() => deleteQuote(q.id)} className={btnDanger}><Trash2 className="h-3 w-3" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('rooms');
  const { resetData } = useStore();

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  const tabs: { id: TabId; label: string }[] = [
    { id: 'rooms', label: 'Rooms' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'experiences', label: 'Experiences' },
    { id: 'restaurant', label: 'Restaurant' },
    { id: 'quotes', label: 'Quotes' },
  ];

  const handleReset = () => {
    if (confirm('Reset all data to factory defaults? This cannot be undone.')) resetData();
  };

  return (
    <div className="min-h-screen bg-[#F5F1EB]">
      {/* Admin header */}
      <div className="bg-[#2E3A28] text-[#F5F1EB] px-6 md:px-12 py-5 flex items-center justify-between">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#9BA88D] block">
            Admin Panel
          </span>
          <h1 className="font-serif text-xl font-light">Rubavu Frontier View</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[#D9D3C7]/70 hover:text-red-300 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset Defaults
          </button>
          <button
            onClick={() => setAuthed(false)}
            className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[#D9D3C7]/70 hover:text-[#F5F1EB] transition-colors"
          >
            <Lock className="h-3.5 w-3.5" /> Lock
          </button>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="bg-white border-b border-[#D9D3C7] px-6 md:px-12">
        <div className="flex gap-0 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-4 font-mono text-xs uppercase tracking-widest border-b-2 transition-colors whitespace-nowrap -mb-px ${
                activeTab === tab.id
                  ? 'border-[#4A5240] text-[#4A5240] bg-[#F5F1EB]/50'
                  : 'border-transparent text-[#7A7468] hover:text-[#2C2C2C]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
        {activeTab === 'rooms' && <RoomsTab />}
        {activeTab === 'gallery' && <GalleryTab />}
        {activeTab === 'experiences' && <ExperiencesTab />}
        {activeTab === 'restaurant' && <RestaurantTab />}
        {activeTab === 'quotes' && <QuotesTab />}
      </div>
    </div>
  );
}
