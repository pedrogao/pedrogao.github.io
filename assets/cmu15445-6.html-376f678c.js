import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as a,c as d,a as e,b as i,e as l,f as c}from"./app-dd607917.js";const o={},u=c(`<h2 id="日志和恢复" tabindex="-1"><a class="header-anchor" href="#日志和恢复" aria-hidden="true">#</a> 日志和恢复</h2><p>计算机容易发生各种故障，如磁盘故障、宕机、软件错误等。一旦计算机故障就容易引起运行其内的数据库丢失数据，因此数据库必须预先采取措施以保证即使发生故障，数据仍然找回。</p><p>恢复机制是数据库必不可少的一部分，它能保证数据库即使在故障发生的情况下，仍然恢复到发生前的状态，保证前后数据的一致性，保证数据库的高可用性。</p><p>恢复算法是确保数据库一致性、原子性和持久性的关键技术。</p><p>恢复算法主要工作包括如下两部分：</p><ul><li><p>记录事务处理期间的操作，以确保 DBMS 可以从故障中恢复；</p></li><li><p>将数据库恢复到某个失败后的状态，确保操作的原子性、一致性和持久性。 恢复算法主要思路：</p></li><li><p>预写日志(WAL)：</p><ul><li>任何数据更改在应用到数据库之前，必须先由日志写入磁盘。</li><li>必须使用 STEAL + NO-FORCE 缓冲池策略。</li></ul></li><li><p>在重做期间恢复历史数据：在重新启动时，重做操作并将数据库恢复到崩溃前的状态。</p></li><li><p>撤消期间记录更改：将撤消操作记录到日志中以确保操作不会在重复失败的情况下重复执行。</p></li></ul><h3 id="日志" tabindex="-1"><a class="header-anchor" href="#日志" aria-hidden="true">#</a> 日志</h3><p>在 bustub 中通过 LogManager 来实现WAL日志记录。类定义如下：</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>class LogManager {
 public:
  explicit LogManager(DiskManager *disk_manager)
      : next_lsn_(0), persistent_lsn_(INVALID_LSN), disk_manager_(disk_manager) {
    log_buffer_ = new char[LOG_BUFFER_SIZE];
    flush_buffer_ = new char[LOG_BUFFER_SIZE];
  }
  ~LogManager() {
    delete[] log_buffer_;
    delete[] flush_buffer_;
    log_buffer_ = nullptr;
    flush_buffer_ = nullptr;
  }
  void RunFlushThread();
  void StopFlushThread();
  void Flush(bool force);
  lsn_t AppendLogRecord(LogRecord *log_record);
  inline lsn_t GetNextLSN() { return next_lsn_; }
  inline lsn_t GetPersistentLSN() { return persistent_lsn_; }
  inline void SetPersistentLSN(lsn_t lsn) { persistent_lsn_ = lsn; }
  inline char *GetLogBuffer() { return log_buffer_; }
  // ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="恢复" tabindex="-1"><a class="header-anchor" href="#恢复" aria-hidden="true">#</a> 恢复</h3><p>那么 bustub 碰到数据库崩溃、电源断开等情况又该如何恢复呢？bustub 的处理其实是比较粗糙的，定义如下：</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>class LogRecovery {
 public:
  LogRecovery(DiskManager *disk_manager, BufferPoolManager *buffer_pool_manager)
      : disk_manager_(disk_manager), buffer_pool_manager_(buffer_pool_manager), offset_(0) {
    log_buffer_ = new char[LOG_BUFFER_SIZE];
  }
  ~LogRecovery() {
    delete[] log_buffer_;
    log_buffer_ = nullptr;
  }
  void Redo();
  void Undo();
  bool DeserializeLogRecord(const char *data, LogRecord *log_record);
  // ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>bustub 的崩溃恢复必须先 Redo 再 Undo，首先 Redo 会扫描全部的日志文件，并通过 LSN 大小来重做未完成的事务，在重做期间记录正在活跃的事务，然后调用 Undo 来撤销这些操作。</p><h3 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h3>`,14),t={href:"https://15445.courses.cs.cmu.edu/fall2019/project4/",target:"_blank",rel:"noopener noreferrer"},v=e("li",null,"Database System Concepts 16",-1),_={href:"https://15445.courses.cs.cmu.edu/fall2019/slides/21-recovery.pdf",target:"_blank",rel:"noopener noreferrer"};function b(m,p){const n=r("ExternalLinkIcon");return a(),d("div",null,[u,e("ul",null,[e("li",null,[e("a",t,[i("PROJECT #4 - LOGGING & RECOVERY"),l(n)])]),v,e("li",null,[e("a",_,[i("Database Recovery"),l(n)])])])])}const g=s(o,[["render",b],["__file","cmu15445-6.html.vue"]]);export{g as default};
